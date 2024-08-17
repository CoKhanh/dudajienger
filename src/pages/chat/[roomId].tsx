import ChatList from "@/components/ChatList";
import ChatSpace from "@/components/ChatSpace";
import { useRouter } from "next/router";

const Chat = () => {
  const { query } = useRouter();
  const { roomId } = query;

  return (
    <div className="w-full h-screen pt-20 flex">
      <ChatList />
      {roomId && roomId !== "default" && (
        <ChatSpace roomId={roomId as string} />
      )}
    </div>
  )
}

export default Chat;
