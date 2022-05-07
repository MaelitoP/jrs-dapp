import React, { useState } from "react";
import { AppProps } from "next/app";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import Layout from "../components/layouts/Layout";

import "../styles/index.css";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Layout>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
          </Layout>
        </Web3ReactProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
