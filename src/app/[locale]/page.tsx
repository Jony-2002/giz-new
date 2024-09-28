// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import About from "@/components/About/About";
import MainSlider from "@/components/MainSlider/MainSlider";
import Partners from "@/components/Partners/Partners";
// import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AEGBAO | Home Page",
  description: "Association of Entrepreneurs of GBAO",
  assets: "../favicon.ico",
  icons: "../favicon.ico",
};

export default async function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/IntMap/IntMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  // const { page } = await getDictionary(lang);
  return (
    <main>
      <Head>
        <title>AEGBAO | Website</title>
        <meta
          name="description"
          content="Association of Entrepreneurs of GBAO"
        />
        <meta
          name="keywords"
          content="Association of Entrepreneurs of GBAO, Ассоциация предпринимателей ГБАО, Ассотсиатсияи соҳибкорони ВМКБ"
        />
        <meta name="author" content="Munosibshoev Muyassar" />
        <meta property="og:title" content="Association of Entrepreneurs of GBAO" />
        <meta
          property="og:description"
          content="Association of Entrepreneurs of GBAO"
        />
        <meta property="og:image" content="/path-to-your-image.jpg" />
        <meta property="og:url" content="https://aegbao.tj/en" />
        <link rel="canonical" href="https://aegbao.tj/en" />
        <link rel="icon" href="../favicon.ico" sizes="any" />;
      </Head>
      <MainSlider />
      <About />
      <section className="h-[600px] flex justify-center items-center mx-[30px] pt-[100px] pb-[50px]">
        <Map />
      </section>
      <Partners />
    </main>
  );
}
