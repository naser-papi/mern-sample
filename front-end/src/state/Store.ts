import { configureStore, combineReducers } from "@reduxjs/toolkit";

import infoSlice from "./InfoSlice";

const reducers = combineReducers({ info: infoSlice });


const store = configureStore({
    reducer: reducers,
    devTools: true,
});

export default store;
