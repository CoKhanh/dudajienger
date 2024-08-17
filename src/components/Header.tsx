import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const handleGoToHome = () => {
    router.push("/");
  }

  return (
    <header className="fixed top-0 w-full px-8 py-5 border border-b-gray-300 bg-white font-bold text-xl">
      <p onClick={handleGoToHome} className="cursor-pointer">Dudajienger</p>
    </header>
  )
}

export default Header;
