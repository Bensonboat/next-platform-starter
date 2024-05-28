import { Dispatch, SetStateAction } from "react";
import style from "./index.module.sass";
import { navigators } from "..";
import { useRouter } from "next/router";
import { BsList } from "react-icons/bs";

interface IMobileHeaderMenuProps {
    setShowMobileMenu: Dispatch<SetStateAction<boolean>>;
}

const MobileHeaderMenu = (props: IMobileHeaderMenuProps) => {
    const router = useRouter();

    return (
        <div className={style.mobileHeaderMenu}>
            <div
                className={style.bg}
                onClick={() => props.setShowMobileMenu(false)}
            ></div>
            <div className={style.menu}>
                <div className={style.drawerBlock}>
                    <BsList />
                </div>
                {navigators.map((item) => {
                    return (
                        <div
                            key={item.route}
                            className={`b26 ${style.option} ${
                                router.asPath === item.route
                                    ? style.highlight
                                    : ""
                            }`}
                            onClick={() => {
                                router.push(item.route);
                                props.setShowMobileMenu(false);
                            }}
                        >
                            {item.label}
                        </div>
                    );
                })}

                <div
                    className={`b26 ${style.option} ${
                        router.asPath === "/login" ? style.highlight : ""
                    }`}
                    onClick={() => {
                        router.push(`/login`);
                        props.setShowMobileMenu(false);
                    }}
                >
                    Login
                </div>
            </div>
        </div>
    );
};

export default MobileHeaderMenu;
