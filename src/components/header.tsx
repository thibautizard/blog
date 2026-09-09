import Image from "next/image";
import Link from "next/link";
import shiba from "@/assets/shiba.svg";

// 🐕🆎
//----------------------
export function Header() {
  return (
    <Link className="flex select-none items-center gap-x-4" href="/posts">
      <ShibaLogo />
      <FrenchDev />
    </Link>
  );
}

// 🐕
//----------------------
function ShibaLogo() {
  return <Image alt="Shiba" priority src={shiba} width={50} />;
}

// 🆎
//----------------------
function FrenchDev() {
  return (
    <h1 className="flex select-none items-center gap-3 text-4xl uppercase">
      frenchdev
    </h1>
  );
}
