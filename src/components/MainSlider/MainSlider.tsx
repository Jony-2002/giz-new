"use client";
import { ICategory, projects_categories } from "@/data/categories";
import { Locale } from "@/i18n.config";
import { API_KEY } from "@/utils";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  const [data, setData] = useState<any>([]);

  async function getProjects() {
    try {
      const response = await fetch(`${API_KEY}/get/news`);
      const data = await response.json();

      let test = [];

      data.forEach((file: any) => {
        // setData([...data, file?.BannerUrl]);
        test.unshift(file);
        setData([...test]);
        console.log(file);
      });

      // setData(data);
      console.log(data, "banners");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const findCategoty = (category: string | any) => {
    const current_categoty = projects_categories.find(
      (item: ICategory) => item.en.toLowerCase() === category?.toLowerCase()
    );

    return current_categoty;
  };

  useEffect(() => {
    getProjects();
    console.log(data);
  }, []);

  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);

  return (
    <section className="wrapper__page mt-10">
      <div className="mx-[30px]">
      <Slider {...settings}>
        {data?.map((file: any) => {
          return (
            <div
              key={file?.Id}
              className="h-[450px] child_slider child_slider-1 pb-10 relative"
            >
              <img
                src={`${API_KEY}/get/static?path=Banners/${file?.banner_url}`}
                alt="Banner"
                className="absolute w-full h-full object-cover"
              />
              <div className="flex flex-col justify-end items-start h-full relative z-30">
                <div>
                  <p className="font-medium">
                    {/* Social Development */}
                    {currentLanguage == "en"
                      ? findCategoty(file?.category)?.en
                      : ""}
                    {currentLanguage == "ru"
                      ? findCategoty(file?.category)?.ru
                      : ""}
                    {currentLanguage == "tj"
                      ? findCategoty(file?.category)?.tj
                      : ""}
                  </p>
                  <h3 className="font-semibold text-2xl mb-3 line-clamp-1">
                    {currentLanguage == "en" ? file?.english?.name : ""}
                    {currentLanguage == "ru" ? file?.russian?.name : ""}
                    {currentLanguage == "tj" ? file?.tajik?.name : ""}
                  </h3>
                  <p className="line-clamp-2">
                    {currentLanguage == "en" ? file?.english?.description : ""}
                    {currentLanguage == "ru" ? file?.russian?.description : ""}
                    {currentLanguage == "tj" ? file?.tajik?.description : ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      </div>
    </section>
  );
}
