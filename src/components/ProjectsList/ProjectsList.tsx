"use client";
import { news_data } from "@/data/news";
import { INews } from "@/types";
import { API_KEY } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsList() {
  const [data, setData] = useState([]);

  async function getProjects() {
    try {
      const response = await fetch(`${API_KEY}/get/project`);
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

  return (
    <section className="my-10 flex items-center gap-10 flex-wrap">
      {data.map((news: INews) => {
        return (
          <div
            key={news.Id}
            className="w-[438px] h-[321px] border relative flex flex-col justify-end items-start rounded-[13px] px-[30px] py-[20px] news__card"
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
                href={`/projects/${news.Id}`}
                className="text-[22px] font-bold line-clamp-2"
              >
                {news.english.name}
              </Link>
              <div className="min-w-full flex items-center justify-between mt-3">
                <p>{news.category}</p>
              </div>
            </div>
            <div className="news__gradient"></div>
          </div>
        );
      })}
    </section>
  );
}
