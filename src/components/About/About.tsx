"use client";
import { Locale } from "@/i18n.config";
import { useLayoutEffect, useState } from "react";

import "./About.css"

export default function About() {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);
  return (
    <section className="mx-[30px]">
      <div className="wrapper__page">
        <h3 className="text-center text-[#C30F08] text-[34px] font-bold uppercase my-[50px]">
          {`${currentLanguage == "en" ? `Tajikistan` : ``}`}
          {`${currentLanguage == "ru" ? `Таджикистан` : ``}`}
          {`${currentLanguage == "tj" ? `Тоҷикистон` : ``}`}
        </h3>
        <div className="flex items-start justify-between gap-10 main-about-wrapper">
          <div className="max-w-[415px]">
            <p className="text-[40px] font-light">
              {`${currentLanguage == "en" ? `Geography` : ``}`}
              {`${currentLanguage == "ru" ? `География` : ``}`}
              {`${currentLanguage == "tj" ? `Ҷуғрофия` : ``}`}
            </p>
            <p className="text-[19px] text-justify mt-3 max-w-[445px]">
              {`${
                currentLanguage == "en"
                  ? `Tajikistan is a landlocked country in Central Asia. It is bordered by Afghanistan to the south, Uzbekistan to the west, Kyrgyzstan to the north, and China to the east. The country is mostly mountainous, with the Pamir Mountains in the east and the Fann Mountains in the west. The highest point in Tajikistan is Mount Ismoil Somoni, which is 7,495 meters (24,590 feet) tall.`
                  : ``
              }`}
              {`${
                currentLanguage == "ru"
                  ? `Таджикистан – не имеющая выхода к морю страна в Центральной Азии. Граничит с Афганистаном на юге, Узбекистаном на западе, Кыргызстаном на севере и Китаем на востоке. Страна в основном гористая, с Памирскими горами на востоке и Фанскими горами на западе. Самая высокая точка Таджикистана — гора Исмоила Сомони, высота которой составляет 7 495 метров (24 590 футов).`
                  : ``
              }`}
              {`${
                currentLanguage == "tj"
                  ? `Тоҷикистон кишварест Дар Осиеи Марказӣ, ки ба баҳр дастрасӣ надорад. Он дар ҷануб Бо Афғонистон, Дар ғарб Бо Узбекистон, дар шимол Бо Қирғизистон ва дар шарқ бо Чин ҳамсарҳад аст. Кишвар асосан кӯҳӣ буда, дар шарқ Кӯҳҳои Помир ва дар ғарб Кӯҳҳои Фанн дорад. Баландтарин нуқтаи Тоҷикистон Кӯҳи Исмоил Сомонӣ мебошад, ки баландиаш 7 495 метр (24 590 фут) мебошад.`
                  : ``
              }`}
            </p>
          </div>
          <div className="max-w-[890px]">
            <div className="flex items-center gap-10">
              <div className="max-w-[445px]">
                <p className="text-[40px] font-light">
                  {`${currentLanguage == "en" ? `Capital` : ``}`}
                  {`${currentLanguage == "ru" ? `Столица` : ``}`}
                  {`${currentLanguage == "tj" ? `Пойтахт` : ``}`}
                </p>
                <p className="text-[19px] text-justify mt-3 max-w-[445px]">
                  {`${
                    currentLanguage == "en"
                      ? `The capital of Tajikistan is Dushanbe. Dushanbe is a large city with a population of over 1 million people. It is located in the southwestern part of the country, in the foothills of the Fann Mountains.`
                      : ``
                  }`}
                  {`${
                    currentLanguage == "ru"
                      ? `Столица Таджикистана Душанбе. Душанбе – крупный город с населением более 1 млн человек. Он расположен в юго-западной части страны, в предгорьях Фанских гор.`
                      : ``
                  }`}
                  {`${
                    currentLanguage == "tj"
                      ? `Пойтахти Тоҷикистон Душанбе. Душанбе шаҳри калонест, ки беш аз 1 миллион аҳолӣ дорад. Он дар қисми ҷанубу ғарбии кишвар, дар пояи Кӯҳҳои Фанн ҷойгир аст.`
                      : ``
                  }`}
                </p>
              </div>
              <div className="max-w-[445px]">
                <p className="text-[40px] font-light">
                  {`${currentLanguage == "en" ? `People` : ``}`}
                  {`${currentLanguage == "ru" ? `Люди` : ``}`}
                  {`${currentLanguage == "tj" ? `Мардум` : ``}`}
                </p>
                <p className="text-[19px] text-justify mt-3 max-w-[445px]">
                  {`${
                    currentLanguage == "en"
                      ? `The majority of the people in Tajikistan are Tajiks. Tajiks are a Persian-speaking people who have lived in the region for centuries. Other ethnic groups in Tajikistan include Uzbeks, Kyrgyz, and Russians.`
                      : ``
                  }`}
                  {`${
                    currentLanguage == "ru"
                      ? `Большинство населения Таджикистана составляют таджики. Таджики – персоязычный народ, веками живший в этом регионе. Другие этнические группы в Таджикистане включают узбеков, кыргызов и русских.`
                      : ``
                  }`}
                  {`${
                    currentLanguage == "tj"
                      ? `Аксарияти сокинони Тоҷикистон тоҷикон мебошанд. Тоҷикон мардуми форсизабон мебошанд, ки асрҳо дар ин минтақа зиндагӣ мекарданд. Дигар гурӯҳҳои этникӣ дар Тоҷикистон узбекҳо, қирғизҳо ва русҳоро дар бар мегиранд.`
                      : ``
                  }`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-10 mt-10">
              <div className="max-w-[445px]">
                <p className="text-[40px] font-light">
                  {`${currentLanguage == "en" ? `Language` : ``}`}
                  {`${currentLanguage == "ru" ? `Язык` : ``}`}
                  {`${currentLanguage == "tj" ? `Забон` : ``}`}
                </p>
                <p className="text-[19px] text-justify mt-3 max-w-[445px]">
                  {`${
                    currentLanguage == "en"
                      ? `The official language of Tajikistan is Tajik. Tajik is a Persian language that is closely related to Farsi. Other languages spoken in Tajikistan include Uzbek, Kyrgyz, and Russian.`
                      : ``
                  }`}
                  {`${
                    currentLanguage == "ru"
                      ? `Официальный язык Таджикистана – таджикский. Таджикский — персидский язык, тесно связанный с фарси. Другие языки, на которых говорят в Таджикистане, включают узбекский, кыргызский и русский.`
                      : ``
                  }`}
                  {`${
                    currentLanguage == "tj"
                      ? `Забони расмии Тоҷикистон забони тоҷикӣ мебошад. Тоҷикӣ забони форсӣ аст, ки бо форсӣ зич алоқаманд аст. Дигар забонҳое, ки Дар Тоҷикистон ҳарф мезананд, забонҳои узбекӣ, қирғизӣ ва русиро дар бар мегиранд.`
                      : ``
                  }`}
                </p>
              </div>
              <div className="max-w-[445px]">
                <p className="text-[40px] font-light">
                  {`${currentLanguage == "en" ? `Religion` : ``}`}
                  {`${currentLanguage == "ru" ? `Религия` : ``}`}
                  {`${currentLanguage == "tj" ? `Дин` : ``}`}
                </p>
                <p className="text-[19px] text-justify mt-3 max-w-[445px]">
                  {`${
                    currentLanguage == "en"
                      ? `The majority of the people in Tajikistan are Muslims. Islam is the official religion of the country. Other religious groups in Tajikistan include Christians, Jews, and Buddhists.`
                      : ``
                  }`}
                  {`${
                    currentLanguage == "ru"
                      ? `Большинство населения Таджикистана – мусульмане. Ислам является официальной религией страны. Другие религиозные группы в Таджикистане включают христиан, иудеев и буддистов.`
                      : ``
                  }`}
                  {`${
                    currentLanguage == "tj"
                      ? `Аксарияти аҳолии Тоҷикистон мусулмонанд. Ислом дини расмии кишвар аст. Дигар гурӯҳҳои динӣ дар Тоҷикистон масеҳиен, яҳудиен ва буддоиенро дар бар мегиранд.`
                      : ``
                  }`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
