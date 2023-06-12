import { createSlice } from "@reduxjs/toolkit";
import { IInfoState } from "../models/General";

const initialState: IInfoState = {
  infoList: []
};

const InfoSlice = createSlice<IInfoState>({
  name: "info",
  initialState: initialState,
  reducers: {
    setList: (state: IInfoState, action) => {
      state.infoList = action.payload;
    },
    updateItem: (state: IInfoState, action) => {
      let exist = state.infoList.find((item) => item.id == action.payload.id);
      if (exist) {
        exist = { ...action.payload };
        state.infoList = [
          ...state.infoList.filter((item) => item.id !== action.payload.id),
          { ...exist }
        ];
      }
    },
    addToList: (state: IInfoState, action) => {
      state.infoList.push(action.payload);
    }
  }
});

export const { setList, addToList, updateItem } = InfoSlice.actions;

export default InfoSlice.reducer;
