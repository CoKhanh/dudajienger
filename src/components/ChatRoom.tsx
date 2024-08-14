export interface ChatRoomProps {
  name: string;
}

const ChatRoom = ({ name }: ChatRoomProps) => {
  return (
    <div className="w-full h-20 px-6 cursor-pointer hover:bg-slate-200 flex gap-4 items-center">
      <div className="w-10 h-10 rounded-full bg-pink-400"></div>
      <p className="font-semibold text-lg">{name}</p>
    </div>
  )
}

export default ChatRoom;
