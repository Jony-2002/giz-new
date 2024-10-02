import AboutText from "@/components/AboutText/AboutText";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "AEGBAO | About Page",
  description: "Association of Entrepreneurs of GBAO",
  assets: "../favicon.ico",
  icons: "../favicon.ico",
};

export default function AboutPage() {
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
        <meta
          property="og:title"
          content="Association of Entrepreneurs of GBAO"
        />
        <meta
          property="og:description"
          content="Association of Entrepreneurs of GBAO"
        />
        <meta property="og:image" content="/path-to-your-image.jpg" />
        <meta property="og:url" content="https://aegbao.tj/en" />
        <link rel="canonical" href="https://aegbao.tj/en" />
        <link rel="icon" href="../favicon.ico" sizes="any" />;
      </Head>
      <AboutText />
    </main>
  );
}
