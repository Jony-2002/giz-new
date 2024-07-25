// "use client";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   localeNames,
//   locales,
//   usePathname,
//   useRouter,
//   type Locale,
// } from "@/i18n.config";
// import { useEffect, useLayoutEffect, useState } from "react";

// export default function LanguageSwitch({ locale }: { locale: Locale }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [currentLanguage, setCurrentLanguage] = useState<any>("");

//   useLayoutEffect(() => {
//     setCurrentLanguage(localStorage.getItem("lang") || "en");
//   }, [currentLanguage]);

//   const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newLocale = event.target.value as Locale;
//     router.replace(pathname, { locale: newLocale });
//     console.log("newLocale", newLocale);
//     setCurrentLanguage(newLocale);
//     localStorage.setItem("lang", newLocale);
//   };
//   return (
//     <select
//       value={locale}
//       onChange={changeLocale}
//       className="rounded-sm bg-sky-200 px-2 py-1 text-sky-950"
//     >
//       {locales.map((loc) => (
//         <option key={loc} value={loc}>
//           {localeNames[loc]}
//         </option>
//       ))}
//     </select>
//   );
// }
"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  localeNames,
  locales,
  usePathname,
  useRouter,
  type Locale,
} from "@/i18n.config";
import { useLayoutEffect, useState } from "react";

import "./LanguageSwitch.css"

export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");

  useLayoutEffect(() => {
    const storedLang = (localStorage.getItem("lang") as Locale) || "en";
    setCurrentLanguage(storedLang);
  }, []);

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;
    router.replace(pathname, { locale: newLocale });
    console.log("newLocale", newLocale);
    setCurrentLanguage(newLocale);
    localStorage.setItem("lang", newLocale);
  };

  return (
    <select
      value={currentLanguage}
      onChange={changeLocale}
      className="rounded-sm bg-sky-200 px-2 py-1 text-sky-950 switcher__container"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}
