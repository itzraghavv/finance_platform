import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex ">
        <Image src="/logo.svg" height={27} width={27} alt="Logo" />
        <p className="font-semibold text-white text-2xl ml-2.5">Finance</p>
      </div>
    </Link>
  );
};
