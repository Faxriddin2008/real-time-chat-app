import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);
  return (
    <>
      <p>Chat</p>
    </>
  );
};

export default Chat;
