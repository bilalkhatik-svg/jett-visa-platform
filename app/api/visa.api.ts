import { apiClient } from "./axios";
import { API_CONFIG } from "./config";
import { visaPurposeStore } from "./mocks/visa.purpose.mock";

export interface GetVisaPurposesParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface VisaPurposeResponse {
  code: string;
  name: string;
  description: string;
  synonyms?: string;
  category?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getVisaPurposes = async (params?: GetVisaPurposesParams) => {
  if (API_CONFIG.VISA_PURPOSE.LIST) {
    return apiClient.get<PaginatedResponse<VisaPurposeResponse>>(API_CONFIG.VISA_PURPOSE.LIST, {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        search: params?.search || "",
        category: params?.category || "",
      },
    });
  }

  // Mock implementation with filtering and pagination
  let data = visaPurposeStore.list();
  
  // Apply search filter (searches in Name, Code, Synonyms, and Description)
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    data = data.filter((item) => {
      const itemWithExtras = item as any; // Mock data doesn't have synonyms yet
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.code.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        (itemWithExtras.synonyms && itemWithExtras.synonyms.toLowerCase().includes(searchLower))
      );
    });
  }

  // Apply category filter
  if (params?.category && params.category !== "All Categories") {
    data = data.filter((item: any) => item.category === params.category);
  }

  // Apply pagination
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return Promise.resolve({
    data: {
      data: paginatedData.map((item: any) => ({
        code: item.code,
        name: item.name,
        description: item.description,
        synonyms: item.synonyms || "",
        category: item.category || "Travel",
        status: item.status,
      })),
      total: data.length,
      page,
      limit,
      totalPages: Math.ceil(data.length / limit),
    },
  });
};

export interface CreateVisaPurposeResponse {
  data?: VisaPurposeResponse;
  error?: string;
  codeExists?: boolean;
  nameExists?: boolean;
}

export const createVisaPurpose = async (
  payload: VisaPurposeResponse
): Promise<CreateVisaPurposeResponse> => {
  // Check for uniqueness
  const existing = visaPurposeStore.list();
  const codeExists = existing.some((item) => item.code.toUpperCase() === payload.code.toUpperCase());
  const nameExists = existing.some(
    (item) => item.name.toLowerCase() === payload.name.toLowerCase()
  );

  if (codeExists) {
    return { error: "Code must be unique", codeExists: true };
  }

  if (nameExists) {
    return { error: "Name must be unique", nameExists: true };
  }

  if (API_CONFIG.VISA_PURPOSE.CREATE) {
    try {
      const response = await apiClient.post<VisaPurposeResponse>(API_CONFIG.VISA_PURPOSE.CREATE, payload);
      return { data: response.data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create visa purpose";
      return { error: errorMessage };
    }
  }

  const newItem = visaPurposeStore.add({
    code: payload.code,
    name: payload.name,
    description: payload.description,
    status: payload.status || "ACTIVE",
    synonyms: payload.synonyms,
    category: payload.category,
  });

  return {
    data: {
      code: newItem.code,
      name: newItem.name,
      description: newItem.description,
      status: newItem.status,
      category: newItem.category || payload.category,
      synonyms: newItem.synonyms || payload.synonyms,
    },
  };
};

export interface UpdateVisaPurposeResponse {
  data?: VisaPurposeResponse;
  error?: string;
  nameExists?: boolean;
}

export const updateVisaPurpose = async (
  payload: VisaPurposeResponse,
  originalCode?: string
): Promise<UpdateVisaPurposeResponse> => {
  // Check for name uniqueness (excluding current item)
  const existing = visaPurposeStore.list();
  const currentCode = originalCode || payload.code;
  
  const nameExists = existing.some(
    (item) =>
      item.code !== currentCode &&
      item.name.toLowerCase() === payload.name.toLowerCase()
  );

  if (nameExists) {
    return { error: "Name must be unique", nameExists: true };
  }

  // Check if code changed and if new code is unique
  if (payload.code !== currentCode) {
    const codeExists = existing.some(
      (item) => item.code !== currentCode && item.code.toUpperCase() === payload.code.toUpperCase()
    );
    if (codeExists) {
      return { error: "Code must be unique", nameExists: false };
    }
  }

  if (API_CONFIG.VISA_PURPOSE.UPDATE) {
    try {
      // Use original code for the endpoint, but send new code in payload
      const endpointCode = originalCode || payload.code;
      const response = await apiClient.put<VisaPurposeResponse>(
        `${API_CONFIG.VISA_PURPOSE.UPDATE}/${endpointCode}`,
        payload
      );
      return { data: response.data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update visa purpose";
      return { error: errorMessage };
    }
  }

  // For mock: if code changed, we need to remove old and add new
  const existingItem = existing.find((item) => item.code === currentCode);
  if (!existingItem) {
    return { error: "Visa purpose not found" };
  }

  // If code changed, remove old entry and add new one
  if (payload.code !== currentCode) {
    visaPurposeStore.remove(currentCode);
    const newItem = visaPurposeStore.add({
      code: payload.code,
      name: payload.name,
      description: payload.description,
      status: payload.status || existingItem.status,
      synonyms: payload.synonyms,
      category: payload.category,
    });
    
    return {
      data: {
        code: newItem.code,
        name: newItem.name,
        description: newItem.description,
        status: newItem.status,
        category: newItem.category || payload.category,
        synonyms: newItem.synonyms || payload.synonyms,
      },
    };
  }

  // Code didn't change, just update
  const updatedItem = visaPurposeStore.update({
    code: payload.code,
    name: payload.name,
    description: payload.description,
    status: payload.status || existingItem.status,
    synonyms: payload.synonyms,
    category: payload.category,
  });

  return {
    data: {
      code: updatedItem.code,
      name: updatedItem.name,
      description: updatedItem.description,
      status: updatedItem.status,
      category: updatedItem.category || payload.category,
      synonyms: updatedItem.synonyms || payload.synonyms,
    },
  };
};

export interface DeleteVisaPurposeResponse {
  success: boolean;
  message?: string;
  inUse?: boolean;
}

export const checkVisaPurposeUsage = async (code: string): Promise<boolean> => {
  // TODO: Implement actual API call to check if purpose is used in visa SKUs
  // For now, return false (not in use)
  if (API_CONFIG.VISA_PURPOSE.DELETE) {
    try {
      const response = await apiClient.get<{ inUse: boolean }>(
        `${API_CONFIG.VISA_PURPOSE.DELETE}/${code}/check-usage`
      );
      return response.data.inUse;
    } catch {
      return false;
    }
  }
  return false;
};

export const deleteVisaPurpose = async (code: string): Promise<DeleteVisaPurposeResponse> => {
  // Check if purpose is in use
  const inUse = await checkVisaPurposeUsage(code);
  if (inUse) {
    return {
      success: false,
      message: "Cannot delete visa purpose. It is currently in use by one or more visa SKUs.",
      inUse: true,
    };
  }

  if (API_CONFIG.VISA_PURPOSE.DELETE) {
    try {
      await apiClient.delete(`${API_CONFIG.VISA_PURPOSE.DELETE}/${code}`);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete visa purpose";
      return { success: false, message: errorMessage };
    }
  }

  visaPurposeStore.remove(code);
  return { success: true };
};
