import clsx from "clsx";
import { currentUser } from "../../helper";
import Link from "next/link";

export interface MessageProps {
  message: string;
  sender: string;
  type: "string" | "image" | "video" |"other";
  url?: string;
};

const Message = ({ message, sender, type, url = "string" }: MessageProps) => {
  const isCurrentUser = sender === currentUser();
  return (
    <div className={clsx("w-fit h-fit", isCurrentUser && "ml-auto text-white", !isCurrentUser && "mr-auto text-black")}>
      <p className={clsx("text-sm font-light", isCurrentUser && "hidden")}>&nbsp; &nbsp;{sender}</p>
      <div className={clsx(
        "w-fit h-fit p-3 rounded-2xl font-medium",
        isCurrentUser && "bg-[#2546FF]",
        !isCurrentUser && "bg-[#F0F0F0]"
      )}>
        {type === "string" && message}
        {type === "image" && (
          <>
            <Link href={url} target="_blank" className="underline">{message}</Link>
            <img src={url} className="h-36 mt-4 rounded-md" />
          </>
        )}
        {type === "video" && (
          <>
            <Link href={url} target="_blank" className="underline">{message}</Link>
            <video className="h-56 mt-4 rounded-md" controls muted autoPlay>
              <source src={url} />
            </video>
          </>
        )}
        {type === "other" && (
          <>
            <Link href={url} target="_blank" className="underline">{message}</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
