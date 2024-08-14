import ChatList from "@/components/ChatList";
import ChatSpace from "@/components/ChatSpace";

const Chat = () => {
  return (
    <div className="w-full h-screen bg-red-200 pt-16 flex">
      <ChatList />
      <ChatSpace />
    </div>
  )
}

export default Chat;
