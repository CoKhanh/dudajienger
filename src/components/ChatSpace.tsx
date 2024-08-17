import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Message from "./Message";
import { Id } from "../../convex/_generated/dataModel";
import { currentUser } from "../../helper";

export interface ChatSpaceProps {
  roomId: string;
}

const ChatSpace = ({ roomId }: ChatSpaceProps) => {
  const messages = useQuery(api.messages.getByRoom, { roomId })
  const room = useQuery(api.rooms.getById, { id: roomId as Id<"rooms"> })

  const isMember = () => {
    return room?.members?.some((m: any) => m === currentUser());
  }

  const mutationMessage = useMutation(api.messages.insertMessage);
  const mutationAddMember = useMutation(api.rooms.addMember);

  const router = useRouter();

  const [message, setMessage] = useState<string>("");

  const handleChangeMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
  }

  const handleJoinRoom = () => {
    const newMember = currentUser();
    if (!newMember) return;
    mutationAddMember({
      newMember,
      id: roomId as Id<"rooms">,
    })
  }

  const handleSendMsg = () => {
    if (!message) return;

    const sender = currentUser();

    if (!sender) return;
    mutationMessage({
      roomId,
      message,
      sender,
    });

    setMessage("");
  };

  useEffect(() => {
    if (!currentUser()) {
      router.push("/");
    }
  }, [])

  if (!room) {
    return (
      <div className="w-full bg-white h-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white h-full flex flex-col-reverse pb-6 px-6">
      <div className="w-full flex justify-between items-center gap-4">
        {isMember() ? (
          <>
            <Input className="rounded-xl" placeholder="Aa" onChange={handleChangeMessageInput} value={message} />
            <Button className="w-8 h-8 rounded-[100%] p-0 bg-[#0F75FF]" onClick={handleSendMsg}>
              <ArrowUp className="w-4" />
            </Button>
          </>
        ) : (
          <Button className="w-full bg-[#0F75FF] font-bold rounded-xl" onClick={handleJoinRoom}>Join</Button>          
        )}
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
