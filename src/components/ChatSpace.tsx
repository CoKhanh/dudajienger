import { ArrowUp, Paperclip, Video } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Message from "./Message";
import { Id } from "../../convex/_generated/dataModel";
import { currentUser, getMediaMsgType } from "../../helper";

export interface ChatSpaceProps {
  roomId: string;
}

const ChatSpace = ({ roomId }: ChatSpaceProps) => {
  const messages = useQuery(api.messages.getByRoom, { roomId })
  const room = useQuery(api.rooms.getById, { id: roomId as Id<"rooms"> })

  const isMember = () => {
    return room?.members?.some((m: any) => m === currentUser());
  }

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const mutationMessageV2 = useMutation(api.messages.insertMessageV2);
  const mutationAddMember = useMutation(api.rooms.addMember);

  const router = useRouter();

  const [message, setMessage] = useState<string>("");
  const messageListRef = useRef<HTMLDivElement>(null);

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

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendStringMsg()
    }
  }

  const handleSendStringMsg = () => {
    if (!message) return;

    const sender = currentUser();

    if (!sender) return;

    mutationMessageV2({
      roomId,
      message,
      sender,
      type: "string",
    })

    setMessage("");
  };

  const handleSendMediaMsg = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const sender = currentUser();

    if (!file || !sender) return;

    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    const { storageId } = await result.json();

    mutationMessageV2({
      storageId,
      roomId,
      message: file.name,
      sender,
      type: getMediaMsgType(file.type),
    })
  }

  useEffect(() => {
    if (!currentUser()) {
      router.push("/");
    }
  }, [])

  useEffect(() => {
    if (!messageListRef.current) return;

    messageListRef.current.lastElementChild?.scrollIntoView();
  }, [messages])

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
            <Input
              className="rounded-xl"
              placeholder="Aa"
              onChange={handleChangeMessageInput}
              onKeyDown={handleEnterKey}
              value={message}
            />
            <Button className="w-8 h-8 rounded-[100%] p-0 bg-[#0F75FF]" onClick={handleSendStringMsg}>
              <ArrowUp className="w-4" />
            </Button>
            <Button className="w-8 h-8 rounded-[100%] p-0 bg-[#0F75FF]" onClick={() => {
              router.push("/chat/video-call")
            }}>
              <Video />
            </Button>
            <>
              <input
                type="file"
                className="hidden"
                id="file-input"
                onChange={handleSendMediaMsg}
              />
              <label htmlFor="file-input" className="cursor-pointer w-8 h-8 rounded-[100%] p-0 border border-[#0F75FF] flex justify-center items-center">
                <Paperclip className="w-4 text-[#0F75FF]" />
              </label>
            </>
          </>
        ) : (
          <Button className="w-full bg-[#0F75FF] font-bold rounded-xl" onClick={handleJoinRoom}>Join</Button>          
        )}
      </div>
      <ScrollArea>
        <div className="w-full h-full py-4 flex flex-col gap-4" ref={messageListRef}>
          {messages?.map(({ _id, sender, message, type, url }) => (
            <Message key={_id} message={message} sender={sender} type={type} url={url} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default ChatSpace;
