import { EIconType, IAlertPopupContent } from "@/components/AlertPopup";
import { createSlice } from "@reduxjs/toolkit";

export interface IGlobalState {
    loading: boolean;
    showAlertPopup: boolean;
    alertPopupContent: IAlertPopupContent;
}

const initialState: IGlobalState = {
    loading: false,
    showAlertPopup: false,
    alertPopupContent: {
        icon: EIconType.Exclamation,
        title: "",
        description: "",
    },
};

export const globalSlice = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        updateLoading: (state, action) => {
            state.loading = action.payload;
        },
        updateShowAlertPopup: (state, action) => {
            state.showAlertPopup = action.payload;
        },
        updateAlertPopupContent: (state, action) => {
            state.alertPopupContent = action.payload;
        },
    },
});

export const { updateLoading, updateShowAlertPopup, updateAlertPopupContent } =
    globalSlice.actions;

export default globalSlice.reducer;
