import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Message from "./Message";

const ChatSpace = () => {
  const roomId = "j97679024dfwdmps7q4jbdqby56yzne7";
  const messages = useQuery(api.messages.getByRoom, { roomId })
  const mutationMessage = useMutation(api.messages.insertMessage);
  const router = useRouter();

  const [message, setMessage] = useState<string>("");

  const handleChangeMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
  }

  const handleSendMsg = () => {
    if (!message) return;

    const sender = localStorage.getItem("user");

    if (!sender) return;
    mutationMessage({
      roomId,
      message,
      sender,
    });

    setMessage("");
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("user");

    if (!currentUser) {
      router.push("/");
    }
  }, [])

  return (
    <div className="w-full bg-white h-full flex flex-col-reverse pb-6 px-6">
      <div className="w-full flex justify-between items-center gap-4">
        <Input className="rounded-xl" placeholder="Aa" onChange={handleChangeMessageInput} value={message} />
        <Button className="w-8 h-8 rounded-[100%] p-0 bg-[#0F75FF]" onClick={handleSendMsg}>
          <ArrowUp className="w-4" />
        </Button>
      </div>
      <ScrollArea>
        <div className="w-full h-full py-4 flex flex-col gap-4">
          {messages?.map(({ _id, sender, message }) => (
            <Message key={_id} message={message} sender={sender} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default ChatSpace;
