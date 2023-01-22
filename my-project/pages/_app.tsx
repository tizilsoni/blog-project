import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalProvider, { GlobalContext } from "../globalState/globalState";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
