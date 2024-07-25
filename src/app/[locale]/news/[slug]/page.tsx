"use client";
import Partners from "@/components/Partners/Partners";
import { news_data } from "@/data/news";
import { Locale } from "@/i18n.config";
import { INews } from "@/types";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./page.css";
import { ICategory, news_categories } from "@/data/categories";
import Link from "next/link";

export default function EachNews({ params }: { params: { slug: string } }) {
  // const currentNews: INews | undefined = news_data.find(
  //   (news: INews) => news.id === params.slug
  // );

  const [data, setData] = useState([]);
  const [slugNews, setSlugNews] = useState<any>({});

  async function getNews() {
    try {
      const response = await fetch("http://127.0.0.1:9595/get/news");
      const data = await response.json();
      setData(data);
      console.log(data);
      const currentNews: INews | undefined = data.find(
        (news: INews) => news.Id === params.slug
      );
      console.log(currentNews);

      setSlugNews(currentNews);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);

  const findCategoty = (category: string | any) => {
    const current_categoty = news_categories.find(
      (item: ICategory) => item.en.toLowerCase() === category?.toLowerCase()
    );

    return current_categoty;
  };

  return (
    <main>
      <div className="wrapper__page">
        <div className="my-12 mx-[30px]">
          <img
            // src={slugNews?.bannerUrl}
            src={`http://127.0.0.1:9595/get/static?path=Banners/${slugNews?.banner_url}`}
            alt="currentNews"
            className="w-full h-[450px] object-cover news_slug"
          />
          <div className="flex items-center gap-5 mt-5">
            {/* <p className="px-6 py-3 bg-[#C0C0C0] text-white rounded-[6px]">
              25.07.2024
            </p> */}
            <p className="px-6 py-3 bg-[#C0C0C0] text-white rounded-[6px]">
              {/* {slugNews?.Category} */}
              {currentLanguage == "en"
                ? findCategoty(slugNews?.category)?.en
                : ""}
              {currentLanguage == "ru"
                ? findCategoty(slugNews?.category)?.ru
                : ""}
              {currentLanguage == "tj"
                ? findCategoty(slugNews?.category)?.tj
                : ""}
            </p>
            <p className="px-6 py-3 bg-[#C0C0C0] text-white rounded-[6px]">
              {slugNews?.date}
            </p>
          </div>
          <h1 className="text-[#C30F08] text-[34px] font-bold text-center mt-[100px] mb-[30px]">
            {currentLanguage == "en" ? slugNews?.english?.name : ""}
            {currentLanguage == "ru" ? slugNews?.russian?.name : ""}
            {currentLanguage == "tj" ? slugNews?.tajik?.name : ""}
          </h1>
          <p>
            {currentLanguage == "en" ? slugNews?.english?.description : ""}
            {currentLanguage == "ru" ? slugNews?.russian?.description : ""}
            {currentLanguage == "tj" ? slugNews?.tajik?.description : ""}
          </p>
          {/* documents */}
          <h4 className="text-[#8D8D8D] text=[24px] font-bold mt-[74px]">
            DOCUMENTS:
          </h4>
          <div className="mt-5 flex justify-start items-start gap-5">
            {slugNews?.links?.map((link: string) => {
              return (
                <a
                  key={slugNews?.Id + link}
                  href={`https://${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8D8D8D] text-[18px] underline"
                >
                  {link}
                </a>
                // <Link
                //   key={slugNews?.Id + link}
                //   className="text-[#8D8D8D] text-[18px] underline"
                //   href={link}
                // >
                //   {link}
                // </Link>
              );
            })}
          </div>
        </div>

        <div className="mx-[30px]">
          <section>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {slugNews?.media_files?.length > 1 ? (
                slugNews?.media_files?.map((image: any) => {
                  return (
                    <SwiperSlide key={image?.Title}>
                      <img
                        src={`http://127.0.0.1:9595/get/static?path=NewsMedia/${image?.image_url}`}
                        className="w-[300px] h-[300px] object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  );
                })
              ) : (
                <div>No media files</div>
              )}
            </Swiper>
          </section>
        </div>
        <Partners />
      </div>
    </main>
  );
}
