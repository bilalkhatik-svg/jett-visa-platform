import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { VisaPurpose } from "../types/VisaPurpose";
import {
  createVisaPurpose,
  deleteVisaPurpose,
  getVisaPurposes,
  updateVisaPurpose,
  type VisaPurposeResponse,
} from "~/api/visa.api";

// Extended VisaPurpose type to include synonyms and category
interface ExtendedVisaPurpose extends VisaPurpose {
  synonyms?: string;
  category?: string;
}

/* ----------------------------------
   STATE TYPE
----------------------------------- */
interface VisaState {
  purposes: ExtendedVisaPurpose[];
  loading: boolean;
  error: string | null;
}

/* ----------------------------------
   INITIAL STATE
----------------------------------- */
const initialState: VisaState = {
  purposes: [],
  loading: false,
  error: null,
};

/* ----------------------------------
   ASYNC THUNKS (CRUD)
----------------------------------- */

// READ (List)
export const fetchVisaPurposes = createAsyncThunk<
  ExtendedVisaPurpose[]
>("visa/fetchVisaPurposes", async (_, { rejectWithValue }) => {
  try {
    const res = await getVisaPurposes();
    // API returns paginated response with data.data array
    return res.data.data as ExtendedVisaPurpose[];
  } catch (error) {
    return rejectWithValue("Failed to fetch visa purposes");
  }
});

// CREATE
export const addVisaPurpose = createAsyncThunk<
  ExtendedVisaPurpose,
  VisaPurposeResponse
>("visa/addVisaPurpose", async (payload, { rejectWithValue }) => {
  try {
    const res = await createVisaPurpose(payload);
    if (res.error) {
      return rejectWithValue(res.error);
    }
    if (!res.data) {
      return rejectWithValue("Failed to add visa purpose");
    }
    return res.data as ExtendedVisaPurpose;
  } catch (error) {
    return rejectWithValue("Failed to add visa purpose");
  }
});

// UPDATE
export const editVisaPurpose = createAsyncThunk<
  ExtendedVisaPurpose,
  { payload: VisaPurposeResponse; originalCode?: string }
>("visa/editVisaPurpose", async ({ payload, originalCode }, { rejectWithValue }) => {
  try {
    const res = await updateVisaPurpose(payload, originalCode);
    if (res.error) {
      return rejectWithValue(res.error);
    }
    if (!res.data) {
      return rejectWithValue("Failed to update visa purpose");
    }
    return res.data as ExtendedVisaPurpose;
  } catch (error) {
    return rejectWithValue("Failed to update visa purpose");
  }
});

// DELETE
export const removeVisaPurpose = createAsyncThunk<
  string,
  string
>("visa/removeVisaPurpose", async (code, { rejectWithValue }) => {
  try {
    const res = await deleteVisaPurpose(code);
    if (!res.success) {
      return rejectWithValue(res.message || "Failed to delete visa purpose");
    }
    if (res.inUse) {
      return rejectWithValue("Cannot delete visa purpose. It is currently in use by one or more visa SKUs.");
    }
    return code;
  } catch (error) {
    return rejectWithValue("Failed to delete visa purpose");
  }
});

/* ----------------------------------
   SLICE
----------------------------------- */
const visaSlice = createSlice({
  name: "visa",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchVisaPurposes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisaPurposes.fulfilled, (state, action) => {
        state.loading = false;
        state.purposes = action.payload;
      })
      .addCase(fetchVisaPurposes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ADD */
      .addCase(addVisaPurpose.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVisaPurpose.fulfilled, (state, action) => {
        state.loading = false;
        state.purposes.push(action.payload);
      })
      .addCase(addVisaPurpose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* EDIT */
      .addCase(editVisaPurpose.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editVisaPurpose.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.purposes.findIndex(
          (p) => p.code === action.payload.code
        );
        if (index !== -1) {
          state.purposes[index] = action.payload;
        } else {
          // If code changed, add as new entry
          state.purposes.push(action.payload);
        }
      })
      .addCase(editVisaPurpose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* DELETE */
      .addCase(removeVisaPurpose.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeVisaPurpose.fulfilled, (state, action) => {
        state.loading = false;
        state.purposes = state.purposes.filter(
          (p) => p.code !== action.payload
        );
      })
      .addCase(removeVisaPurpose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default visaSlice.reducer;
