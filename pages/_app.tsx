import React from "react";
import { AppProps } from "next/app";

import Layout from "../components/layouts/Layout";

import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
