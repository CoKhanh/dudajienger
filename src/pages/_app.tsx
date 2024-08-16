'use client'

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConvexClientProvider>
  );
}
