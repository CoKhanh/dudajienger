import ChatRoom from "./ChatRoom"

const ChatList = () => {
  return (
    <div className="w-1/4 bg-white h-full border border-r-gray-300">
      <ChatRoom name="Frontend Dev" />
      <ChatRoom name="Backend Dev" />
      <ChatRoom name="Product" />
    </div>
  )
}

export default ChatList
