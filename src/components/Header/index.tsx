import style from "./index.module.sass";
import MobileHeaderMenu from "./MobileHeaderMenu";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { IRootState } from "@reduxjs/toolkit";
import { BsList } from "react-icons/bs";

export const navigators = [
    {
        label: "TQ88",
        route: "/home",
    },
];

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <>
            <div className={style.header}>
                <div
                    className={style.drawerBlock}
                    onClick={() => setShowMobileMenu(true)}
                >
                    <BsList />
                </div>
            </div>
            {showMobileMenu && (
                <MobileHeaderMenu setShowMobileMenu={setShowMobileMenu} />
            )}
        </>
    );
};

export default Header;
