import React,{useContext} from 'react'
// import "../Pages/styles/Sidebar.scss"
 import "../Pages/styles/Chat.scss"
import {AiOutlineUserAdd} from "react-icons/ai"
import {HiDotsVertical} from "react-icons/hi"
import Messages from './Messages'                               
import Input from './Input'
import { ChatContext } from "../Context/ChatContext";                               

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className='Chat'>
      <div className='Chat-Info'>
        <span>{data.user?.displayName}</span>
        <div className='chat-icons'>
         <AiOutlineUserAdd  size={25}/>
          <HiDotsVertical size={25}/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat