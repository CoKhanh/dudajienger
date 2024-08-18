import { useQuery } from "convex/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import dynamic from "next/dynamic";
import clsx from "clsx";

const ChatRoom = dynamic(() => import("./ChatRoom"), {
  ssr: false,
})

const Header = () => {
  const rooms = useQuery(api.rooms.get);

  const router = useRouter();
  const handleGoToHome = () => {
    router.push("/");
  };

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  return (
    <div className={clsx("w-full fixed z-50 top-0", openMenu && "h-screen", !openMenu && "h-fit")}>
      <header
        className="w-full h-fit px-4 md:px-8 py-4 md:py-5 bg-white border border-b-gray-300 font-bold text-xl flex justify-between"
      >
        <p onClick={handleGoToHome} className="cursor-pointer text-[#2546FF]">Dudajienger</p>
        <Link
          className="hidden md:block hover:scale-105 transition-all delay-75 ease-in font-medium text-sm border border-[#2546FF] text-[#2546FF] rounded-lg p-2"
          href={"https://docs.google.com/document/d/1IfSEmeKGwFK4uPpiapGJLu2qJ7v61zJ7JD1NvSFicDo/edit?usp=sharing"}
          target="_blank"
        >
          Technical Design
        </Link>
        {!openMenu ? (
          <Menu className="text-[#2546FF] block md:hidden" onClick={handleOpenMenu} />
        ) : (
          <X className="text-[#2546FF] block md:hidden" onClick={handleCloseMenu} />
        )}
      </header>
      {openMenu && (
        <div className="w-full h-full bg-white flex flex-col md:hidden items-center gap-4">
          {rooms?.map(({ _id, name }) => (
            <ChatRoom key={_id} name={name} roomId={_id} avatar={"bg-[#F0F0F0]"} customAction={handleCloseMenu} />
          ))}
          <Link
            className="w-fit hover:scale-105 transition-all delay-75 ease-in font-medium text-sm border border-[#2546FF] text-[#2546FF] rounded-lg p-2"
            href={"https://docs.google.com/document/d/1IfSEmeKGwFK4uPpiapGJLu2qJ7v61zJ7JD1NvSFicDo/edit?usp=sharing"}
            target="_blank"
          >
            Technical Design
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
