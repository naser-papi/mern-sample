import { createSlice } from "@reduxjs/toolkit";
import { IGeneralState } from "../models/General";

const initialState = {
  notify: "",
  isBusy: false
} as IGeneralState;
const generalSlice = createSlice<IGeneralState>({
  name: "general",
  initialState: initialState,
  reducers: {
    setIsBusy: (state: IGeneralState, action) => {
      state.isBusy = action.payload;
    },
    showNotify: (state: IGeneralState, action) => {
      state.notify = action.payload;
    }
  }
});

export const { setIsBusy, showNotify } = generalSlice.actions;

export default generalSlice.reducer;
