import { configureStore } from "@reduxjs/toolkit";
import globalSlice, { IGlobalState } from "./globalSlice";

export interface IRootState {
    globalSlice: IGlobalState;
}

const store = configureStore({
    reducer: {
        globalSlice,
    },
});

export default store;
