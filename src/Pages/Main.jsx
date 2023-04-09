import React from 'react'
import "./styles/Main.scss"
import Sidebar from "../Component/Sidebar"
import Chat from "../Component/Chat"

const Main = () => {
  return (
    <div className='Main'>
        <Sidebar />
        <Chat/>
        
    </div>
  )
}

export default Main