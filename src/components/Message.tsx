import clsx from "clsx";

export interface MessageProps {
  message: string;
  sender: string;
}

const Message = ({ message, sender }: MessageProps) => {
  const currentUser = localStorage.getItem("user");
  const isCurrentUser = sender === currentUser;
  return (
    <div className={clsx("w-fit h-fit", isCurrentUser && "ml-auto text-white", !isCurrentUser && "mr-auto text-black")}>
      <p className="text-sm font-light">&nbsp; &nbsp;{sender}</p>
      <div className={clsx(
        "w-fit h-fit p-3 rounded-2xl font-medium",
        isCurrentUser && "bg-[#2546FF]",
        !isCurrentUser && "bg-[#F0F0F0]"
      )}>
        {message}
      </div>
    </div>
  )
}

export default Message;
