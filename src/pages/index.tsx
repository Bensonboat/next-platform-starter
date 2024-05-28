import { useRouter } from "next/router";
import { useEffect } from "react";

const RootPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/about");
    }, [router.asPath]);
    return <div></div>;
};

export default RootPage;
