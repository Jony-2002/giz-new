"use client";
import { Locale } from "@/i18n.config";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

export default function Navbar() {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);
  return (
    <nav>
      <ul className="flex items-center gap-[30px]">
        <li>
          <Link className="font-semibold uppercase" href={"/"}>
            {currentLanguage == "en" ? "Home" : ""}
            {currentLanguage == "ru" ? "Главная" : ""}
            {currentLanguage == "tj" ? "Асосӣ" : ""}
          </Link>
        </li>
        <li>
          <Link className="font-semibold uppercase" href={"/about"}>
            {currentLanguage == "en" ? "About" : ""}
            {currentLanguage == "ru" ? "О нас" : ""}
            {currentLanguage == "tj" ? "Дар бораи мо" : ""}
          </Link>
        </li>
        <li>
          <Link className="font-semibold uppercase" href={"/news"}>
            {currentLanguage == "en" ? "News" : ""}
            {currentLanguage == "ru" ? "Новости" : ""}
            {currentLanguage == "tj" ? "Хабарҳо" : ""}
          </Link>
        </li>
        <li>
          <Link className="font-semibold uppercase" href={"/projects"}>
            {currentLanguage == "en" ? "Projects" : ""}
            {currentLanguage == "ru" ? "Проекты" : ""}
            {currentLanguage == "tj" ? "Лоиҳаҳо" : ""}
          </Link>
        </li>
        <li>
          <a className="font-semibold uppercase" href={"#footer"}>
            {currentLanguage == "en" ? "Contacts" : ""}
            {currentLanguage == "ru" ? "Контакты" : ""}
            {currentLanguage == "tj" ? "Тамос" : ""}
          </a>
        </li>
      </ul>
    </nav>
  );
}
