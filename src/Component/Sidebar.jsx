import React from 'react'
import { useState } from 'react'
import "../Pages/styles/Sidebar.scss"
import Chats from './Chats'
import Navbar from "./Navbar"
import Search from "./Search"
import {FaBars} from "react-icons/fa"

const Sidebar = () => {

  const [expanded , SetExpanded] = useState(false)
  return (
    <>
    <div className='bars' style={expanded ? {left:"5%"} :{left:"5%"} }>
      {!expanded ? <FaBars onClick={()=>SetExpanded(!expanded)}/> : <FaBars onClick={()=>SetExpanded(!expanded)}/> }
    </div>
    <div className='Sidebar' style={expanded ? {left:"-100%"} :{left:"0%"} }>
      <Navbar/>
      <Search/>
      <Chats/>
    
    </div>
    </>
  )
}

export default Sidebar