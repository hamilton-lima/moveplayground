import { AppProps } from "next/app";
import Layout from "../app/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moveplayground",
  description: "Move, Play, Control",
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
