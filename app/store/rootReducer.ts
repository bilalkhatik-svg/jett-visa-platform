import { combineReducers } from "@reduxjs/toolkit";
import visaReducer from "../features/visa/visaSlice";

export const rootReducer = combineReducers({
  visa: visaReducer,
});
