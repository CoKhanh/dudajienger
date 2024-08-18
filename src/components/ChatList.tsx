import { useQuery } from "convex/react";
import ChatRoom from "./ChatRoom";
import { api } from "../../convex/_generated/api";

const ChatList = () => {
  const rooms = useQuery(api.rooms.get);
  return (
    <div className="w-1/4 bg-white h-full border border-r-gray-300">
      {rooms?.map(({ _id, name }) => (
        <ChatRoom key={_id} name={name} roomId={_id} avatar={"bg-[#F0F0F0]"} />
      ))}
    </div>
  );
};

export default ChatList;
