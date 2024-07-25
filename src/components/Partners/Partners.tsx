"use client";
import Logo1 from "@/assets/images/XMLID_1_.svg";
import Tcell from "@/assets/images/Vector.svg";
import UCA from "@/assets/images/logo-new.png";
import MSDSP from "@/assets/images/MSDSP_logo_tjk_2022-04-14_color-01.png";
import GizLogo from "@/assets/images/Vector.png";
import PamirEnergy from "@/assets/images/logo.png";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { Locale } from "@/i18n.config";

import Logo2 from "../../../src/assets/logos/Layer_x0020_1 (1).svg";
import Logo3 from "../../../src/assets/logos/Layer_x0020_1.svg";
import Logo4 from "../../../src/assets/logos/_3114062639792.svg";
import Link from "next/link";

export default function Partners() {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);
  return (
    <section className="my-[100px] mx-[30px]">
      <div className="wrapper__page">
        <h3 className="text-[24px] text-[#8D8D8D] font-bold uppercase text-center mb-5">
          {currentLanguage == "en" ? "Partners" : ""}
          {currentLanguage == "ru" ? "Парнёры" : ""}
          {currentLanguage == "tj" ? "Шарикон" : ""}
        </h3>
        <div className="flex items-center justify-center flex-wrap gap-10">
          <Link href={"/"}>
            <Image src={Logo2} alt="Logo1" />
            {/* <p className="text-[#4B4B4D] text-[18px] font-bold">Text 1</p> */}
          </Link>
          <Link href={"/"}>
            <Image src={Logo3} alt="Logo1" />
            {/* <p className="text-[#4B4B4D] text-[18px] font-bold">Text 2</p> */}
          </Link>
          <Link href={"/"}>
            <Image src={Logo4} alt="Logo1" />
            {/* <p className="text-[#4B4B4D] text-[18px] font-bold">Text 3</p> */}
          </Link>
          <Link href={"/"}>
            <Image src={Tcell} alt="Tcell" />
          </Link>
          <Link href={"/"}>
            <Image src={UCA} alt="UCA" />
          </Link>
          <Link href={"/"}>
            <Image src={MSDSP} alt="UCA" />
          </Link>
          <Link href={"/"}>
            <Image src={GizLogo} alt="UCA" />
          </Link>
          <Link href={"/"}>
            <Image src={PamirEnergy} alt="UCA" />
          </Link>
        </div>
      </div>
    </section>
  );
}
