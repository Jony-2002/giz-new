import LogoIcon from "@/assets/images/Frame 28762.svg";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image src={LogoIcon} alt="LogoIcon" />
    </Link>
  );
}
