import style from "./index.module.sass";

const Loading = () => {
    return (
        <div className={`${style.loadingMask}`}>
            <div className={`${style.bgcMask}`}></div>
            <div className={`${style.loading}`}>
                <div className={`${style.loadingIconSpinner}`}></div>
                <div
                    className={`${style.loading} ${style.loadingIconTxt}`}
                ></div>
            </div>
        </div>
    );
};

export default Loading;
