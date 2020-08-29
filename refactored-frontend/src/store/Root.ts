import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRoot {
  isLoading: boolean;
  message?: string;
}

export const rootSlice = createSlice({
  name: "root",
  initialState: <IRoot>{
    isLoading: false,
  },
  reducers: {
    setLoading(state, action: PayloadAction) {
      return { ...state, isLoading: true };
    },
    completeLoad(state, action: PayloadAction<IRoot["message"]>) {
      return { ...state, message: action.payload, isLoading: false };
    },
  },
});

export const { setLoading, completeLoad } = rootSlice.actions;
