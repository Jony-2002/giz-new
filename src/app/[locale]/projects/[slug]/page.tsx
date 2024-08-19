"use client";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import Partners from "@/components/Partners/Partners";
import { ICategory, projects_categories } from "@/data/categories";
import { news_data } from "@/data/news";
import { Locale } from "@/i18n.config";
import { INews, IProject } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

import "./page.css"
import { API_KEY } from "@/utils";


export default function EachNews({ params }: { params: { slug: string } }) {
  const [data, setData] = useState([]);
  const [slugNews, setSlugNews] = useState<any>({});

  async function getProject() {
    try {
      const response = await fetch(`${API_KEY}/get/project`);
      const data = await response.json();
      setData(data);
      console.log(data);
      const currentProject: IProject | undefined = data.find(
        (project: IProject) => project.Id === params.slug
      );
      setSlugNews(currentProject);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProject();
  }, []);

  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);

  const findCategoty = (category: string | any) => {
    const current_categoty = projects_categories.find(
      (item: ICategory) => item.en.toLowerCase() === category?.toLowerCase()
    );

    return current_categoty;
  };

  let content = "";

  if (currentLanguage == "en") {
    if (slugNews?.location?.district == 1) {
      content = "Khorog";
    }
    if (slugNews?.location?.district == 2) {
      content = "Darvoz";
    }
    if (slugNews?.location?.district == 3) {
      content = "Vanj";
    }
    if (slugNews?.location?.district == 4) {
      content = "Rushon";
    }
    if (slugNews?.location?.district == 5) {
      content = "Shughnon";
    }
    if (slugNews?.location?.district == 6) {
      content = "Ishkoshim";
    }
    if (slugNews?.location?.district == 7) {
      content = "Roshtqala";
    }
    if (slugNews?.location?.district == 8) {
      content = "Murghob";
    }
  } else if (currentLanguage == "ru") {
    if (slugNews?.location?.district == 1) {
      content = "Хорог";
    }
    if (slugNews?.location?.district == 2) {
      content = "Дарвоз";
    }
    if (slugNews?.location?.district == 3) {
      content = "Вандж";
    }
    if (slugNews?.location?.district == 4) {
      content = "Рушан";
    }
    if (slugNews?.location?.district == 5) {
      content = "Шугнан";
    }
    if (slugNews?.location?.district == 6) {
      content = "Ишкашим";
    }
    if (slugNews?.location?.district == 7) {
      content = "Рошткала";
    }
    if (slugNews?.location?.district == 8) {
      content = "Мургаб";
    }
  } else if (currentLanguage == "tj") {
    if (slugNews?.location?.district == 1) {
      content = "Хоруғ";
    }
    if (slugNews?.location?.district == 2) {
      content = "Дарвоз";
    }
    if (slugNews?.location?.district == 3) {
      content = "Ванҷ";
    }
    if (slugNews?.location?.district == 4) {
      content = "Рушон";
    }
    if (slugNews?.location?.district == 5) {
      content = "Шуғнон";
    }
    if (slugNews?.location?.district == 6) {
      content = "Ишкошим";
    }
    if (slugNews?.location?.district == 7) {
      content = "Роштқалъа";
    }
    if (slugNews?.location?.district == 8) {
      content = "Мурғоб";
    }
  }

  return (
    <main>
      <div className="wrapper__page">
        <div className="my-12 mx-[30px]">
          {/* <Image
            src={slugNews?.BannerUrl}
            alt="currentNews"
            className="w-full h-[450px] object-cover"
          /> */}
          <img
            src={`${API_KEY}/get/static?path=Banners/${slugNews?.banner_url}`}
            alt="currentNews"
            className="w-full h-[450px] object-cover news__banner"
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
              {content}
              {/* {slugNews?.Location?.District} */}
              {/* District */}
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
          <h4 className="text-[#8D8D8D] text-[24px] font-bold mt-[74px]">
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
              );
            })}
          </div>
        </div>
        <ImageCarousel data={slugNews?.media_files} />
        <Partners />
      </div>
    </main>
  );
}
