import React from 'react'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
  const {currentuser}= useContext(AuthContext)
  return (
    <div className='navbar'>
        <span className='logo'>Logo</span>
        <div className='user'>
          <img src={currentuser.photoURL} alt="" />
          <span>{currentuser.displayName}</span>
          <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar