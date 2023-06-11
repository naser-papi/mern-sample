import { createSlice } from "@reduxjs/toolkit";
import { IInfoState } from "../models/General";

const initialState: IInfoState = {
  infoList: [],
  isBusy: false
};

const InfoSlice = createSlice<IInfoState>({
  name: "info",
  initialState: initialState,
  reducers: {
    setList: (state: IInfoState, action) => {
      state.infoList = action.payload;
    },
    setIsBusy: (state: IInfoState, action) => {
      state.isBusy = action.payload;
    },
    addToList: (state: IInfoState, action) => {
      state.infoList.push(action.payload);
    }
  }
});

export const { setList, setIsBusy,addToList } = InfoSlice.actions;

export default InfoSlice.reducer;
