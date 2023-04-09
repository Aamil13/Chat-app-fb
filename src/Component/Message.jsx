import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Message = ({message}) => {
  const { currentuser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={`message ${message.senderId === currentuser.uid && "owner"}`}
    >
      <div className='messageInfo'>
        <img src={
            message.senderId === currentuser.uid
              ? currentuser.photoURL
              : data.user.photoURL
          } alt="" />
        <span>Just now</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message