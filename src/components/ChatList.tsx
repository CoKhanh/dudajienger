import ChatRoom from "./ChatRoom"

const ChatList = () => {
  return (
    <div className="w-1/4 bg-white h-full border border-r-gray-300">
      <ChatRoom name="Frontend Dev" roomId="j97679024dfwdmps7q4jbdqby56yzne7" avatar="bg-yellow-400" />
      <ChatRoom name="Backend Dev" roomId="j976k8ybkqa5c3vycafgn3cs3n6yz5fj" avatar="bg-[#F0F0F0]" />
      <ChatRoom name="Product" roomId="j972tdx8xy5b09ga9frjjagcsn6yztc3" avatar="bg-[#0F75FF]" />
    </div>
  )
}

export default ChatList
