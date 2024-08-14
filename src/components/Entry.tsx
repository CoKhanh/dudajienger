import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Entry = () => {
  const router = useRouter();

  const handleJoin = () => {
    router.push("/chat");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-1/4 gap-6 text-center">
        <h1 className="font-bold text-3xl">Sign In</h1>
        <Input placeholder="your nickname" />
        <Button onClick={handleJoin}>Join</Button>
      </div>
    </div>
  )
}

export default Entry;
