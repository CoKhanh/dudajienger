import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { currentUser } from "../../helper";

const Entry = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>("");

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setNickname(value);
  }

  const handleJoin = () => {
    if (nickname) {
      localStorage.setItem("user", nickname);
    } else {
      localStorage.setItem("user", `Anonymous${Date.now()}`);
    }

    router.push("/chat/default");
  }

  useEffect(() => {
    if (currentUser()) {
      router.push("/chat/default");
    }
  }, [])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-1/4 gap-6 text-center">
        <h1 className="font-bold text-3xl">Sign In</h1>
        <Input placeholder="your nickname" value={nickname} onChange={handleChangeNickname} />
        <Button onClick={handleJoin} className="bg-[#0F75FF]">Join</Button>
      </div>
    </div>
  )
}

export default Entry;
