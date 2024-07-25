"use client";
import ProjectsFilter from "@/components/ProjectsFilter/ProjectsFilter";
import ProjectsList from "@/components/ProjectsList/ProjectsList";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory, projects_categories } from "@/data/categories";
import { Locale } from "@/i18n.config";
import { Input } from "@/shadcn/ui/input";
import { IProject } from "@/types";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

import "./projects.css"

export default function ProjectsPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);

  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [filteredNews, setFilteredNews] = useState<IProject[]>([]);

  useEffect(() => {
    filterNews();
  }, [searchQuery, selectedCategory, selectedDistrict, data]);

  const filterNews = () => {
    let filtered = data;

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project: IProject) =>
          project.english.name.toLowerCase().includes(lowerCaseQuery) ||
          project.english.description.toLowerCase().includes(lowerCaseQuery) ||
          project.tajik.name.toLowerCase().includes(lowerCaseQuery) ||
          project.tajik.description.toLowerCase().includes(lowerCaseQuery) ||
          project.russian.name.toLowerCase().includes(lowerCaseQuery) ||
          project.russian.description.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (selectedDistrict && selectedDistrict !== "All") {
      filtered = filtered.filter(
        (project: IProject) =>
          project.location.district === parseInt(selectedDistrict)
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((project: IProject) =>
        project.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  };

  async function getProjects() {
    try {
      const response = await fetch("http://127.0.0.1:9595/get/project");
      const data = await response.json();
      setData(data);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  const findCategoty = (category: string) => {
    const current_categoty = projects_categories.find(
      (item: ICategory) => item.en.toLowerCase() === category.toLowerCase()
    );

    return current_categoty;
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
  };

  const getDistrictName = (districtId: number) => {
    if (currentLanguage == "en") {
      switch (districtId) {
        case 1:
          return "Khorog";
        case 2:
          return "Darvoz";
        case 3:
          return "Vanj";
        case 4:
          return "Rushon";
        case 5:
          return "Shughnon";
        case 6:
          return "Ishkoshim";
        case 7:
          return "Roshtqal'a";
        case 8:
          return "Murghob";
        default:
          return "";
      }
    } else if (currentLanguage == "ru") {
      switch (districtId) {
        case 1:
          return "Хорог";
        case 2:
          return "Дарвоз";
        case 3:
          return "Вандж";
        case 4:
          return "Рушан";
        case 5:
          return "Шугнан";
        case 6:
          return "Ишкашим";
        case 7:
          return "Рошткала";
        case 8:
          return "Мургаб";
        default:
          return "";
      }
    } else if (currentLanguage == "tj") {
      switch (districtId) {
        case 1:
          return "Хоруг";
        case 2:
          return "Дарвоз";
        case 3:
          return "Ванч";
        case 4:
          return "Рушон";
        case 5:
          return "Шугнон";
        case 6:
          return "Ишкошим";
        case 7:
          return "Рошткала";
        case 8:
          return "Мургоб";
        default:
          return "";
      }
    }
    return "";
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDistrict("All");
  };

  return (
    <main>
      <div className="wrapper__page">
        <div className="mx-[30px]">
          <h3 className="text-center text-[#C30F08] text-[34px] font-bold uppercase my-[50px]">
            {/* {t("title")} */}
            {currentLanguage == "en" ? "Projects" : ""}
            {currentLanguage == "ru" ? "Проекты" : ""}
            {currentLanguage == "tj" ? "Лоиҳаҳо" : ""}
          </h3>
          <section>
            <div className="flex items-center justify-between flex-wrap gap-5 projects__filter">
              <div className="flex items-center gap-5">
                <label
                  htmlFor=""
                  className="text-[#666666] font-semibold text-[18px]"
                >
                  Search
                </label>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="projects__input"
                  type="text"
                  placeholder="Search..."
                />
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor=""
                  className="text-[#666666] font-semibold text-[18px]"
                >
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-[300px] max-w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="All">
                        {currentLanguage === "en" ? "All" : ""}
                        {currentLanguage === "ru" ? "Все" : ""}
                        {currentLanguage === "tj" ? "Ҳама" : ""}
                      </SelectItem>
                      <SelectItem value="Startups">
                        {currentLanguage == "en"
                          ? findCategoty("Startups")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Startups")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Startups")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Innovative project">
                        {currentLanguage == "en"
                          ? findCategoty("Innovative project")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Innovative project")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Innovative project")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Social project">
                        {currentLanguage == "en"
                          ? findCategoty("Social project")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Social project")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Social project")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Technological project">
                        {currentLanguage == "en"
                          ? findCategoty("Technological project")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Technological project")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Technological project")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Ecology">
                        {currentLanguage == "en"
                          ? findCategoty("Ecology")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Ecology")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Ecology")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Education">
                        {currentLanguage == "en"
                          ? findCategoty("Education")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Education")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Education")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Healthcare">
                        {currentLanguage == "en"
                          ? findCategoty("Healthcare")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Healthcare")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Healthcare")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Tourism">
                        {currentLanguage == "en"
                          ? findCategoty("Tourism")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Tourism")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Tourism")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Culture and arts">
                        {currentLanguage == "en"
                          ? findCategoty("Culture and arts")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Culture and arts")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Culture and arts")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Agriculture">
                        {currentLanguage == "en"
                          ? findCategoty("Agriculture")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Agriculture")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Agriculture")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Small and medium business">
                        {currentLanguage == "en"
                          ? findCategoty("Small and medium business")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Small and medium business")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Small and medium business")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Information Technology">
                        {currentLanguage == "en"
                          ? findCategoty("Information Technology")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Information Technology")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Information Technology")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Manufacturing and industry">
                        {currentLanguage == "en"
                          ? findCategoty("Manufacturing and industry")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Manufacturing and industry")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Manufacturing and industry")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Services">
                        {currentLanguage == "en"
                          ? findCategoty("Services")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Services")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Services")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Trade">
                        {currentLanguage == "en" ? findCategoty("Trade")?.en : ""}
                        {currentLanguage == "ru" ? findCategoty("Trade")?.ru : ""}
                        {currentLanguage == "tj" ? findCategoty("Trade")?.tj : ""}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor=""
                  className="text-[#666666] font-semibold text-[18px]"
                >
                  District
                </label>
                <Select
                  value={selectedDistrict}
                  onValueChange={handleDistrictChange}
                >
                  <SelectTrigger className="w-[300px] max-w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>District</SelectLabel>
                      <SelectItem value="All">
                        {currentLanguage === "en" ? "All" : ""}
                        {currentLanguage === "ru" ? "Все" : ""}
                        {currentLanguage === "tj" ? "Ҳама" : ""}
                      </SelectItem>
                      <SelectItem value="1">{getDistrictName(1)}</SelectItem>
                      <SelectItem value="2">{getDistrictName(2)}</SelectItem>
                      <SelectItem value="3">{getDistrictName(3)}</SelectItem>
                      <SelectItem value="4">{getDistrictName(4)}</SelectItem>
                      <SelectItem value="5">{getDistrictName(5)}</SelectItem>
                      <SelectItem value="6">{getDistrictName(6)}</SelectItem>
                      <SelectItem value="7">{getDistrictName(7)}</SelectItem>
                      <SelectItem value="8">{getDistrictName(8)}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <button
                onClick={resetFilters}
                className="reset__project border border-[#666666] text-[#666666] uppercase px-[35px] py-[7px] rounded-full hover:bg-[#666666] hover:text-[#fff] transition-all active:bg-[#414040]"
              >
                reset
              </button>
            </div>
          </section>
          {/* <ProjectsFilter /> */}
          <section className="my-10 flex items-center gap-9 flex-wrap projects__list">
            {filteredNews.length > 0 ? (
              filteredNews.map((news: IProject) => {
                return (
                  <div
                    key={news.Id}
                    className="w-[438px] h-[321px] border relative flex flex-col justify-end items-start rounded-[13px] px-[30px] py-[20px] news__card"
                  >
                    <img
                      src={`http://127.0.0.1:9595/get/static?path=Banners/${news.banner_url}`}
                      alt={news.banner_url}
                      width={438}
                      height={321}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-[13px]"
                    />
                    <div className="min-w-full relative z-[3] text-white">
                      <Link
                        href={`/projects/${news.Id}`}
                        className="text-[22px] font-bold line-clamp-2"
                      >
                        {currentLanguage == "en" ? news.english?.name : ""}
                        {currentLanguage == "ru" ? news.russian?.name : ""}
                        {currentLanguage == "tj" ? news.tajik?.name : ""}
                      </Link>
                      <div className="min-w-full flex items-center justify-between mt-3">
                        {/* <p>{news.Category}</p> */}
                        <p>
                          {currentLanguage == "en"
                            ? findCategoty(news.category)?.en
                            : ""}
                          {currentLanguage == "ru"
                            ? findCategoty(news.category)?.ru
                            : ""}
                          {currentLanguage == "tj"
                            ? findCategoty(news.category)?.tj
                            : ""}
                        </p>
                        {/* <p>25.07.2024</p> */}
                      </div>
                    </div>
                    <div className="news__gradient"></div>
                  </div>
                );
              })
            ) : (
              <div>Cannot find any projects</div>
            )}
          </section>
        </div>
        {/* <ProjectsList /> */}
      </div>
    </main>
  );
}
