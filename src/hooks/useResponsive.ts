import { useEffect, useState } from "react";

const useResponsive = () => {
    const [width, setWidth] = useState(0);

    const resize = () => {
        let width = window.innerWidth;
        setWidth(width);
    };

    useEffect(() => {
        window.addEventListener("resize", resize);

        setWidth(window.innerWidth);
        if (!width) {
            return;
        }
    }, [width]);

    useEffect(() => {
        // Reset inner height
        const initAdjustViewHeight = () => {
            //@ts-ignore
            document
                .querySelector(":root")
                //@ts-ignore
                .style.setProperty("--vh", window.innerHeight / 100 + "px");
        };
        initAdjustViewHeight();
        resize();
    }, [width]);

    return { width };
};

export default useResponsive;
