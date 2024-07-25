"use client"
import Link from "next/link"
import "./Menu.css"
import { useLayoutEffect, useState, useRef } from "react";
import { Locale, localeNames, locales, usePathname, useRouter } from "@/i18n.config";

export default function Menu() {
	const [currentLanguage, setCurrentLanguage] = useState<Locale>("en");
	const [menuOpen, setMenuOpen] = useState(false);

	useLayoutEffect(() => {
		const storedLang = (localStorage.getItem("lang") as Locale) || "en";
		setCurrentLanguage(storedLang);
	}, []);

	const handleMenuClick = () => {
		setMenuOpen(!menuOpen);
		if (!menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	};

	const handleCloseMenu = () => {
		setMenuOpen(false);
		document.body.style.overflow = 'auto';
	};

	const pathname = usePathname();
	const router = useRouter();

	useLayoutEffect(() => {
		const storedLang = (localStorage.getItem("lang") as Locale) || "en";
		setCurrentLanguage(storedLang);
	}, []);

	const changeLocale = (event: any) => {
		const newLocale = event.target.value as Locale;
		router.replace(pathname, { locale: newLocale });
		console.log("newLocale", newLocale);
		setCurrentLanguage(newLocale);
		localStorage.setItem("lang", newLocale);
	};

	return (
		<menu>
			<div className="lines_wrapper" onClick={handleMenuClick}>
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
			</div>
			<div className={`bg-[#C30F08] menu-links ${menuOpen ? "open" : ""}`}>
				<div>
					<Link className="text-white" href={"/"}>
						{currentLanguage == "en" ? "Home" : ""}
						{currentLanguage == "ru" ? "Главная" : ""}
						{currentLanguage == "tj" ? "Асосӣ" : ""}
					</Link>
				</div>
				<div>
					<Link className="text-white" href={"/about"}>
						{currentLanguage == "en" ? "About" : ""}
						{currentLanguage == "ru" ? "О нас" : ""}
						{currentLanguage == "tj" ? "Дар бораи мо" : ""}
					</Link>
				</div>
				<div>
					<Link className="text-white" href={"/news"}>
						{currentLanguage == "en" ? "News" : ""}
						{currentLanguage == "ru" ? "Новости" : ""}
						{currentLanguage == "tj" ? "Хабарҳо" : ""}
					</Link>
				</div>
				<div>
					<Link className="text-white" href={"/projects"}>
						{currentLanguage == "en" ? "Projects" : ""}
						{currentLanguage == "ru" ? "Проекты" : ""}
						{currentLanguage == "tj" ? "Лоиҳаҳо" : ""}
					</Link>
				</div>
				<div>
					<a className="text-white" href={"#footer"}>
						{currentLanguage == "en" ? "Contacts" : ""}
						{currentLanguage == "ru" ? "Контакты" : ""}
						{currentLanguage == "tj" ? "Тамос" : ""}
					</a>
				</div>
				<div className="flex items-center gap-5 border-t pt-4">
					{locales.map((loc) => (
						<button onClick={changeLocale} key={loc} value={loc}>
							{localeNames[loc]}
						</button>
					))}
				</div>
				<div>
					<button className="back-button" onClick={handleCloseMenu}>X</button>
				</div>
			</div>
		</menu>
	)
}
