import style from "./index.module.sass";
import useResponsive from "hooks/useResponsive";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { IRootState } from "@reduxjs/toolkit";
import AlertPopup from "../AlertPopup";

interface IAppContainerProps {
    children: ReactNode;
}

const AppContainer = (props: IAppContainerProps) => {
    useResponsive();
    const { loading, showAlertPopup } = useSelector(
        (state: IRootState) => state.globalSlice
    );

    return (
        <>
            {props.children}
            {loading && <Loading />}
            <div
                className={`${
                    showAlertPopup ? style.showAlertPopup : style.alertPopup
                }`}
            >
                <AlertPopup />
            </div>
        </>
    );
};

export default AppContainer;
