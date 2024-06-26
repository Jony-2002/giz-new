"use client";
import Link from "next/link";
import Logo from "../Logo/Logo";
import { useLayoutEffect, useState } from "react";
import { Locale } from "@/i18n.config";

export default function Footer() {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);
  return (
    <footer id="footer" className="bg-[#C30F08] text-white py-[50px]">
      <div className="wrapper__page">
        <div className="flex items-center justify-between">
          <div>
            <Logo />
            <p>
              {currentLanguage == "en" ? "© 2024. All rights reserved." : ""}
              {currentLanguage == "ru" ? "© 2024. Все права защищены." : ""}
              {currentLanguage == "tj" ? "© 2024. Ҳамаи ҳуқуқҳо маҳфузанд." : ""}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-10 mb-3">
              <Link className="text-[18px] font-bold uppercase min-w-[150px]" href={"/"}>
                {currentLanguage == "en" ? "Home" : ""}
                {currentLanguage == "ru" ? "Главная" : ""}
                {currentLanguage == "tj" ? "Асосӣ" : ""}
              </Link>
              <Link className="text-[18px] font-bold uppercase min-w-[150px]" href={"/"}>
                {currentLanguage == "en" ? "News" : ""}
                {currentLanguage == "ru" ? "Новости" : ""}
                {currentLanguage == "tj" ? "Хабархо" : ""}
              </Link>
            </div>
            <div className="flex items-center gap-10">
              <Link className="text-[18px] font-bold uppercase min-w-[150px]" href={"/"}>
                {currentLanguage == "en" ? "About" : ""}
                {currentLanguage == "ru" ? "О нас" : ""}
                {currentLanguage == "tj" ? "Дар бораи мо" : ""}
              </Link>
              <Link className="text-[18px] font-bold uppercase min-w-[150px]" href={"/"}>
                {currentLanguage == "en" ? "Projects" : ""}
                {currentLanguage == "ru" ? "Проекты" : ""}
                {currentLanguage == "tj" ? "Лоиҳаҳо" : ""}
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-[18px] font-bold">
              {currentLanguage == "en" ? "Contacts" : ""}
              {currentLanguage == "ru" ? "Контакты" : ""}
              {currentLanguage == "tj" ? "Тамос" : ""}
            </h4>
            <a href="mailto:info@aegbao.tj">
              info@aegbao.tj
            </a>
            {/* <br />
            <a href="mailto:gbaobusinessassociation@gmail.com">
              gbaobusinessassociation@gmail.com
            </a> */}
            <br />
            <a href="tel:+992 (93) 514 26-66">935142666</a>
            <br />
            <a href="tel:+992 (93) 592 26-99">935922699</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
