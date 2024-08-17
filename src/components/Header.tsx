import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const handleGoToHome = () => {
    router.push("/");
  }

  return (
    <header className="fixed top-0 w-full px-8 py-5 border border-b-gray-300 bg-white font-bold text-xl flex justify-between items-center">
      <p onClick={handleGoToHome} className="cursor-pointer text-[#2546FF]">Dudajienger</p>
      <Link className="hover:scale-105 transition-all delay-75 ease-in font-medium text-sm border border-[#2546FF] text-[#2546FF] rounded-lg p-2" href={"https://docs.google.com/document/d/1IfSEmeKGwFK4uPpiapGJLu2qJ7v61zJ7JD1NvSFicDo/edit?usp=sharing"} target="_blank">Technical Design</Link>
    </header>
  )
}

export default Header;
