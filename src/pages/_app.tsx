import "../styles/globals.sass";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { Provider, useDispatch } from "react-redux";
import store from "@/redux/index";
import AppContainer from "@/components/AppContainer";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <div className={`appContainer`}>
                <AppContainer>
                    <div className={`pageContainer`}>
                        <Component {...pageProps} />
                    </div>
                </AppContainer>
            </div>
        </Provider>
    );
}

export default MyApp;
