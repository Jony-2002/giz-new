// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import About from "@/components/About/About";
import MainSlider from "@/components/MainSlider/MainSlider";
import Partners from "@/components/Partners/Partners";
// import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import dynamic from "next/dynamic";
import { useMemo } from "react";

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
      {/* <h1>Home Page</h1>
      <h1>{page.home.title}</h1> */}
      <MainSlider />
      <About />
      <section className="h-[600px] flex justify-center items-center mx-[30px] pt-[100px] pb-[50px]">
        <Map />
      </section>
      <Partners />
    </main>
  );
}
