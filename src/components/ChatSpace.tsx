import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const MessageReceived = () => {
  return (
    <div className="w-fit h-fit bg-[#F0F0F0] mr-auto p-3 rounded-xl">
      Approved
    </div>
  )
}

const MessageSent = () => {
  return (
    <div className="w-fit h-fit bg-[#2546FF] ml-auto p-3 rounded-xl text-white">
      Welcome on board
    </div>
  )
}

const ChatSpace = () => {
  return (
    <div className="w-full bg-white h-full flex flex-col-reverse pb-6 px-6">
      <div className="w-full flex justify-between items-center gap-4">
        <Input className="rounded-xl" placeholder="Aa" />
        <Button className="w-8 h-8 rounded-[100%] p-0 bg-[#0F75FF]">
          <ArrowUp className="w-4" />
        </Button>
      </div>
      <ScrollArea>
        <div className="w-full h-full py-4 flex flex-col gap-4">
          <MessageReceived />
          <MessageSent />
          <MessageReceived />
          <MessageSent />
          <MessageSent />
          <MessageSent />
          <MessageSent />
          <MessageSent />
          <MessageReceived />
          <MessageSent />
          <MessageReceived />
          <MessageSent />
          <MessageSent />
          <MessageSent />
          <MessageSent />
          <MessageSent />
          <MessageReceived />
          <MessageReceived />
        </div>
      </ScrollArea>
    </div>
  )
}

export default ChatSpace;
