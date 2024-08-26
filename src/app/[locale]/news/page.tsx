"use client";
import NewsFilter from "@/components/NewsFilter/NewsFilter";
import NewsList from "@/components/NewsList/NewsList";
import { INews } from "@/types";
import Link from "next/link";

import { Calendar } from "@/shadcn/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/lib/utils";

import { addMilliseconds, addMinutes, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/shadcn/ui/input";
import { Locale } from "@/i18n.config";
import { ICategory, news_categories } from "@/data/categories";

import "./news.css"
import { API_KEY } from "@/utils";
import Head from "next/head";

export default function NewsPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);

  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredNews, setFilteredNews] = useState<INews[]>([]);


  const formatCustomDate = (date: any) => {
    const timezoneOffset = date.getTimezoneOffset();
    const tzHours = Math.abs(Math.floor(timezoneOffset / 60));
    const tzMinutes = Math.abs(timezoneOffset % 60);
    const tzSign = timezoneOffset > 0 ? '-' : '+';
    const tz = `${tzSign}${String(tzHours).padStart(2, '0')}${String(tzMinutes).padStart(2, '0')}`;

    return format(addMilliseconds(addMinutes(date, timezoneOffset), date.getMilliseconds()), `yyyy-MM-dd HH:mm:ss.SSSSSSS 'GMT${tz}' 'tjk'`);
  };

  const now = new Date();
  const formattedDate = formatCustomDate(now);
  console.log("formattedDate", formattedDate.slice(0, 10));


  const [fromDate, setFromDate] = useState<Date | any>(null);
  const [toDate, setToDate] = useState<Date | any>(null);

  useEffect(() => {
    filterNews();
  }, [searchQuery, selectedCategory, fromDate, toDate, data]);

  const filterNews = () => {
    let filtered = data;

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (news: INews) =>
          news.category.toLowerCase().includes(lowerCaseQuery) ||
          news.english.name.toLowerCase().includes(lowerCaseQuery) ||
          news.english.description.toLowerCase().includes(lowerCaseQuery) ||
          news.tajik.name.toLowerCase().includes(lowerCaseQuery) ||
          news.tajik.description.toLowerCase().includes(lowerCaseQuery) ||
          news.russian.name.toLowerCase().includes(lowerCaseQuery) ||
          news.russian.description.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((news: INews) =>
        news.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (fromDate) {
      filtered = filtered.filter(
        (news: any) => {
          // console.log("new's date: ", news.date);
          // console.log("from date: ", fromDate);
          // console.log("to date: ", toDate);
          console.log(news);

          return news.date >= fromDate && news.date <= toDate
        }
      );
    }

    if (toDate) {
      filtered = filtered.filter((news: any) => {
        console.log("new's date: ", news.date);
        console.log("from date: ", fromDate);
        console.log("to date: ", toDate);
        console.log(news);

        return news.date >= fromDate && news.date <= toDate
      });
    }

    setFilteredNews(filtered);
  };

  async function getNews() {
    try {
      const response = await fetch(`${API_KEY}/get/news`);
      const data = await response.json();
      setData(data.reverse());
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  const findCategoty = (category: string) => {
    const current_categoty = news_categories.find(
      (item: ICategory) => item.en.toLowerCase() === category.toLowerCase()
    );

    return current_categoty;
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setFromDate("")
    setToDate("")
  };

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
      <div className="wrapper__page">
        <div className="mx-[30px]">
          <h3 className="text-center text-[#C30F08] text-[34px] font-bold uppercase my-[50px]">
            {currentLanguage == "en" ? "News" : ""}
            {currentLanguage == "ru" ? "Новости" : ""}
            {currentLanguage == "tj" ? "Хабарҳо" : ""}
          </h3>
          <section>
            <div className="flex items-center justify-between gap-[50px] filter-wrapper">
              <div className="flex items-center gap-5 news-input-wrapper">
                <label
                  htmlFor=""
                  className="text-[#666666] font-semibold text-[18px]"
                >
                  Search
                </label>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=""
                  type="text"
                />
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor=""
                  className="text-[#666666] font-semibold text-[18px]"
                >
                  From
                </label>
                <div>
                  {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[180px] justify-start text-left font-normal",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? (
                        format(fromDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover> */}
                  <Input
                    className=""
                    type="date"
                    placeholder="Введите название новости..."
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor=""
                  className="text-[#666666] font-semibold text-[18px]"
                >
                  To
                </label>
                <div>
                  <Input
                    className=""
                    type="date"
                    placeholder="Введите название новости..."
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                  {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[180px] justify-start text-left font-normal",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? (
                        format(toDate, "PPP")
                      ) : (
                        <span>Pick a Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover> */}
                </div>
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor=""
                  className="text-[#666666] font-semibold text-[18px]"
                >
                  Category
                </label>
                <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                  <SelectTrigger className="">
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
                      <SelectItem value="Event">
                        {currentLanguage == "en" ? findCategoty("Event")?.en : ""}
                        {currentLanguage == "ru" ? findCategoty("Event")?.ru : ""}
                        {currentLanguage == "tj" ? findCategoty("Event")?.tj : ""}
                      </SelectItem>
                      <SelectItem value="Seminar">
                        {currentLanguage == "en"
                          ? findCategoty("Seminar")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Seminar")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Seminar")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Training">
                        {currentLanguage == "en"
                          ? findCategoty("Training")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Training")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Training")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Conference">
                        {currentLanguage == "en"
                          ? findCategoty("Conference")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Conference")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Conference")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Exhibition">
                        {currentLanguage == "en"
                          ? findCategoty("Exhibition")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Exhibition")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Exhibition")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Webinar">
                        {currentLanguage == "en"
                          ? findCategoty("Webinar")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Webinar")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Webinar")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Master Class">
                        {currentLanguage == "en"
                          ? findCategoty("Master Class")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Master Class")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Master Class")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Forum">
                        {currentLanguage == "en" ? findCategoty("Forum")?.en : ""}
                        {currentLanguage == "ru" ? findCategoty("Forum")?.ru : ""}
                        {currentLanguage == "tj" ? findCategoty("Forum")?.tj : ""}
                      </SelectItem>
                      <SelectItem value="Meeting">
                        {currentLanguage == "en"
                          ? findCategoty("Meeting")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Meeting")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Meeting")?.tj
                          : ""}
                      </SelectItem>
                      <SelectItem value="Presentation">
                        {currentLanguage == "en"
                          ? findCategoty("Presentation")?.en
                          : ""}
                        {currentLanguage == "ru"
                          ? findCategoty("Presentation")?.ru
                          : ""}
                        {currentLanguage == "tj"
                          ? findCategoty("Presentation")?.tj
                          : ""}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div> <button
                onClick={resetFilters}
                className="border border-[#666666] text-[#666666] uppercase px-[35px] py-[7px] rounded-full hover:bg-[#666666] hover:text-[#fff] transition-all active:bg-[#414040]"
              >
                reset
              </button></div>
              {/* <button className="border border-[#666666] text-[#666666] uppercase px-[35px] py-[7px] rounded-full hover:bg-[#666666] hover:text-[#fff] transition-all active:bg-[#414040]">
              search
            </button> */}
            </div>
          </section>
          {/* <NewsList data={data} setData={setData} filteredNews={filteredNews}/> */}
          <section className="my-10 flex items-center justify-start gap-9 flex-wrap news_wrapper-section">
            {filteredNews.length > 0 ? (
              filteredNews.map((news: INews) => {
                return (
                  <div
                    key={news.Id}
                    className="w-[438px] max-w-full h-[321px] border relative flex flex-col justify-end items-start rounded-[13px] px-[30px] py-[20px] news__card"
                  >
                    <img
                      src={`${API_KEY}/get/static?path=Banners/${news.banner_url}`}
                      alt={news.banner_url}
                      width={438}
                      height={321}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-[13px]"
                    />
                    <div className="min-w-full relative z-[3] text-white">
                      <Link
                        href={`/news/${news.Id}`}
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
                        <p>{news?.date}</p>
                      </div>
                    </div>
                    <div className="news__gradient"></div>
                  </div>
                );
              })
            ) : (
              <div>Cannot find any news</div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
