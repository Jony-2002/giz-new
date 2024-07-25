import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import Navbar from "../Navbar/Navbar";

export default function Header() {
  const currentLocale: "en" | "ru" | "tj" = "en";
  return (
    <header className="bg-[#C30F08] text-white py-[50px] px-[30px]">
      <div className="wrapper__page flex items-center justify-between gap-10">
        <Logo />
        <Navbar />
        <LanguageSwitch locale={currentLocale} />
        <Menu />
      </div>
    </header>
  );
}
