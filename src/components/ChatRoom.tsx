import clsx from "clsx";
import { useRouter } from "next/router";

export interface ChatRoomProps {
  name: string;
  roomId: string;
  avatar: string;
}

const ChatRoom = ({ name, roomId, avatar }: ChatRoomProps) => {
  const router = useRouter();
  const { query } = router;
  const { roomId: id } = query;

  const handleClickRoom = () => {
    router.push(`/chat/${roomId}`, undefined, { shallow: true });
  }

  return (
    <div className={clsx("w-full h-20 px-6 cursor-pointer hover:bg-slate-200 flex gap-4 items-center", roomId === id && "bg-slate-200")} onClick={handleClickRoom}>
      <div className={clsx("w-10 h-10 rounded-[100%] flex justify-center items-center font-bold", avatar)}>
        <p className="mix-blend-difference text-white">
          {name[0]}
        </p>
      </div>
      <p className="font-semibold text-lg">{name}</p>
    </div>
  )
}

export default ChatRoom;
