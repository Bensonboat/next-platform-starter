import Image from "next/image";
import style from "./index.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@reduxjs/toolkit";
import { updateShowAlertPopup } from "@/redux/globalSlice";

export interface IAlertPopupContent {
    icon: EIconType;
    title: string;
    description: string;
}

export enum EIconType {
    SUCCESS = "/icon/popup_success.svg",
    ERROR = "/icon/popup_error.svg",
    Exclamation = "/icon/popup_exclamation.svg",
}

const AlertPopup = () => {
    const { alertPopupContent } = useSelector(
        (state: IRootState) => state.globalSlice
    );

    const dispatch = useDispatch();

    return (
        <div className={style.alertPopup}>
            <div
                className={style.bg}
                onClick={() => {
                    dispatch(updateShowAlertPopup(false));
                }}
            ></div>
            <div className={style.container}>
                <div className={style.statusIconBlock}>
                    <Image fill src={alertPopupContent.icon} alt="icon" />
                </div>
                <div className={`b9 ${style.title}`}>
                    {alertPopupContent.title}
                </div>
                <>
                    {alertPopupContent.description && (
                        <div className={`b18 ${style.description}`}>
                            {alertPopupContent.description}
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default AlertPopup;
