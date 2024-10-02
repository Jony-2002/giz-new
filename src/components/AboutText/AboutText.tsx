"use client"
import Image from "next/image";
import About from "../About/About";
import Partners from "../Partners/Partners";
import { useLayoutEffect, useState } from "react";
import { Locale } from "@/i18n.config";
import BigLogo from "@/assets/images/Frame 28763.svg";
export default function AboutText() {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);
  return (
    <div className="wrapper__page">
      <div className="flex items-center justify-center my-[100px] mx-[30px]">
        <Image src={BigLogo} alt="BigLogo" />
      </div>
      <div className="flex flex-col justify-start items-start gap-5 mb-[148px] mx-[30px]">
        <p className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Association of Entrepreneurs of GBAO (hereafter "AE of
            GBAO") has been established on 26th July 2023 to strengthen the
            economic opportunities of entrepreneurs, provide financial education
            and the basics of entrepreneurship to its members, access to
            financial and economic opportunities for the development of
            entrepreneurship in the region.`
              : ""
          } `}
          {`${
            currentLanguage == "ru"
              ? `Ассоциация предпринимателей ГБАО (далее «АП ГБАО») была создана в 2023 году с целью усиления экономических возможностей предпринимателей. Она также стремится предоставить своим членам финансовое образование и базовые знания предпринимательства, а также обеспечить доступ к финансовым и экономическим ресурсам для развития бизнеса в регионе.`
              : ""
          } `}
          {`${
            currentLanguage == "tj"
              ? `Ассотсиатсияи соҳибкорони ВМКБ (минбаъд – АС ВМКБ) бо мақсади таҳкими имкониятҳои иқтисодии соҳибкорон  соли 2023 таъсис дода шудааст. Он инчунин саъй намуда истодааст, ки ба аъзоёни худ маълумоти молиявӣ ва донишҳои асосии соҳибкорӣ, инчунин дастрасӣ ба захираҳои молиявӣ ва иқтисодӣ барои рушди соҳибкорӣ дар минтақаро таъмин намояд.`
              : ``
          } `}
        </p>
        <p className="text-[18px] text-justify">
          {`${currentLanguage == "en" ? `Tasks of the “AE of GBAO”` : ``}`}
          {`${currentLanguage == "ru" ? `Задачи АП ГБАО` : ``}`}
          {`${currentLanguage == "tj" ? `Вазифаҳои АС ВМКБ:` : ``}`}
        </p>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Creating opportunities for business development of association members.`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Создание возможностей для развития бизнеса участников ассоциации`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Фароҳам овардани имкониятҳо барои рушди соҳибкории аъзоёни ассотсиатсия..`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Supporting the participation of association members in national and international fairs and exhibitions`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Поддержка участия членов ассоциации в национальных и международных ярмарках и выставках`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Дастгирии иштироки аъзоёни ассотсиатсия дар ярмаркаҳо ва намоишгоҳҳои миллӣ ва байналмилалӣ.`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Conducting training and organizing internships for entrepreneurs at the regional, national and international levels`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Проведение обучения и организация стажировок для предпринимателей на региональном, национальном и международном уровнях`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Гузаронидани омӯзиш ва ташкили таҷрибаомӯзӣ барои соҳибкорон дар сатҳи минтақавӣ, миллӣ ва байналмилалӣ.`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Organization of vocational training courses for people with a profession`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Организация курсов профессиональной подготовки для людей, имеющих профессию`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Ташкили курсҳои омўзиши касбӣ барои шахсони дорои касб;`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Conducting competitions and other events aimed at promoting business`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Проведение конкурсов и других мероприятий, направленных на продвижение бизнеса`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Гузаронидани озмунҳо ва дигар чорабиниҳо, ки ба пешбурди соҳибкорӣ нигаронида шудаанд.`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Networking and developing cooperation with other associations at national and international levels`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Создание сетей и развитие сотрудничества с другими ассоциациями на национальном и международном уровнях`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Таъсиси шабака ва рушди ҳамкорӣ бо дигар ассотсиатсияҳо дар сатҳи миллӣ ва байналмилалӣ`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Raising awareness among entrepreneurs through international and national initiatives.`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Повышение осведомленности предпринимателей через международные и национальные инициативы`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Баланд бардоштани сатҳи огоҳии соҳибкорон тавассути ташаббусҳои байналмилалӣ ва миллӣ.`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Raising capital for business development of association members through government investments, development partners, philanthropists and membership fees`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Привлечение капитала для развития бизнеса членов ассоциации через государственные инвестиции, партнеров по развитию, благотворителей и членские взносы`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Ҷалб намудани сармоя барои рушди соҳибкории аъзоёни ассотсиатсия тавассути сармоягузориҳои давлатӣ, шарикони рушд, хайрхоҳон ва ҳаққи аъзогӣ.
`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Cooperation with other associations at national and international levels`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Сотрудничество с другими ассоциациями на национальном и международном уровнях`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Ҳамкорӣ бо дигар ассотсиатсияҳо дар сатҳи миллӣ ва байналмилалӣ`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Implementation of business development programs`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Реализация программ развития бизнеса`
              : ``
          }`}
          {`${
            currentLanguage == "tj" ? `Татбиқи барномаҳои рушди соҳибкорӣ` : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Perform other tasks that do not contradict the legislation of the Republic of Tajikistan`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Выполнение других задач, не противоречащих законодательству Республики Таджикистан`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Дигар вазифаҳоеро иҷро менамояд, ки хилофи қонунгузории Ҷумҳурии Тоҷикистон нестанд.`
              : ``
          }`}
        </li>
        <p className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `The first event organized by “AE of GBAO” was the Pamir Investment Forum in August 2023. This event brought together local and foreign investors. The forum was organized in cooperation with the local executive authority of GBAO with the financial support of international donor organizations operating in the territory of the Republic of Tajikistan`
              : ``
          } `}
          {`${
            currentLanguage == "ru"
              ? `Первым мероприятием, организованным АП ГБАО, стал Памирский инвестиционный форум в августе 2023 года. Это мероприятие объединило местных и иностранных инвесторов. Форум был организован в сотрудничестве с местным органом исполнительной власти ГБАО при финансовой поддержке международных донорских организаций, действующих на территории Республики Таджикистан`
              : ``
          } `}
          {`${
            currentLanguage == "tj"
              ? `Нахустин чорабинӣ, ки аз ҷониби АС ВМКБ соли 2023 баргузор гардид, Форуми «Помир Инвест» буд. Ин чорабинӣ сармоягузорони маҳаллӣ ва хориҷиро ба ҳам овард. Форум дар ҳамкорӣ бо мақомоти иҷроияи ҳокимияти давлатии ВМКБ бо дастгирии молиявии созмонҳои байналмилалии донорӣ, ки дар қаламрави Ҷумҳурии Тоҷикистон фаъолият доранд, баргузор гардид.`
              : ``
          } `}
        </p>
        <p className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `The following participants took part in Pamir Investment Forum`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `В работе Памирского инвестиционного форума участвовали`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Дар Форуми сармоягузории Помир иштирокчиёни зерин ширкат намуданд:`
              : ``
          }`}
        </p>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Representatives of business and authorities of the People's Republic of China`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `представители бизнеса и властей Китайской Народной Республики`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `намояндагони доираҳои тиҷорат ва мақомоти Ҷумҳурии Мардумии Чин;`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${currentLanguage == "en" ? `Tajik - Korean company` : ``}`}
          {`${currentLanguage == "ru" ? `таджикско - корейская компания` : ``}`}
          {`${currentLanguage == "tj" ? `ширкати тоҷикӣ - кореягӣ;` : ``}`}
        </li>
        <li className="text-[18px] text-justify">
          {`${currentLanguage == "en" ? `Sarez Capital LLC` : ``}`}
          {`${currentLanguage == "ru" ? `ООО «Сарез Капитал»` : ``}`}
          {`${currentLanguage == "tj" ? `ҶДММ «Сарез Капитал»;` : ``}`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Deputy Minister of Economic Development of the Russian Federation`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `заместитель министра экономического развития Российской Федерации`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `муовини вазири рушди иқтисодии Федератсияи Русия;`
              : ``
          }`}
        </li>
        <li className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `Ambassador of the United States of America to Tajikistan and many others`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `посол Соединенных Штатов Америки в Таджикистане и многие другие`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `сафири Иёлоти Муттахидаи Амрико дар Тоҷикистон ва дигарон.`
              : ``
          }`}
        </li>
        <p className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `The topics of the forum included the development of three main potential sectors of the GBAO economy. Areas of possible investment included the mining sector, the development of the tourism industry in the region, the creation of industrial enterprises and the processing of local agricultural products. Entrepreneurs presented more than 34 business plans aimed at developing these sectors`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `Тематика форума включала вопросы развития трех основных потенциальных секторов экономики ГБАО. Области возможных инвестиций включали горнодобывающий сектор, развитие туристической отрасли в регионе, создание промышленных предприятий и переработку местной продукции в сфере сельского хозяйства. Предприниматели представили более 34 бизнес-планов, направленных на развитие данных секторов.`
              : ``
          }`}
          {`${
            currentLanguage == "tj"
              ? `Дар рафти форум масъалаҳои рушди се бахши асосии иқтисоди ВМКБ муҳокима гардиданд. Ҳамчунин масъалаҳои сармоягузории эҳтимолӣ барои бахши истихроҷи маъдан, рушди соҳаи сайёҳӣ дар минтақа, бунёди корхонаҳои саноатӣ ва коркарди маҳсулоти кишоварзии маҳаллӣ баррасӣ шуданд. Соҳибкорон беш аз 34 нақшаи бизнес, ки ба рушди ин самтҳо нигаронида шудаанд, пешниҳод намуданд.`
              : ``
          }`}
        </p>
        <p className="text-[18px] text-justify">
          {`${
            currentLanguage == "en"
              ? `“AE of GBAO” has the right to carry out activities requiring special permission or license only after receiving the appropriate permit. The permit expires upon expiration.`
              : ``
          }`}
          {`${
            currentLanguage == "ru"
              ? `АП ГБАО имеет право осуществлять деятельность, требующей специального разрешения или лицензии, только после получения соответствующего разрешения. Действие разрешения прекращается по истечении срока его действия.`
              : ` `
          }`}
          {`${
            currentLanguage == "tj"
              ? `“АС ВМКБ ҳуқуқ дорад фаъолиятеро, ки иҷозатномаи махсусро (литсензия) талаб мекунад, танҳо баъди гирифтани иҷозатномаи дахлдор амалӣ намояд. Амали иҷозатнома пас аз гузаштани мӯҳлат ба охир мерасад.`
              : ``
          }`}
        </p>
      </div>
      <About />
      <Partners />
    </div>
  );
}
