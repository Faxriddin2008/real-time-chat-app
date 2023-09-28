import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((user, index) => {
            return (
              <div
                key={index}
                className="single-user"
                onClick={() => createChat(user._id, user._id)}
              >
                {user.name}
                <span className="user-online"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
