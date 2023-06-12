import { configureStore, combineReducers } from "@reduxjs/toolkit";
import infoSlice from "./InfoSlice";
import generalSlice from "./GeneralSlice";

const reducers = combineReducers({ info: infoSlice,general:generalSlice });


const store = configureStore({
    reducer: reducers,
    devTools: true,
});

export default store;
