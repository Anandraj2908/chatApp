import React from 'react'
import { userAuth } from '../utils/AuthContext'
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
    const {user, handleUserLogout} = userAuth()
  return (
    <div className='headerContent bg-slate-700'>
      <div className='font-mono text-3xl font-extrabold'>Nirvan Chat</div>
      {user ? 
        (<div className='flex'><div className='m-4'>Hey, {user.name}</div><IoIosLogOut onClick={handleUserLogout} className='text-3xl my-4 hover:cursor-pointer' /></div>):
        (<div>LogIn</div>) 
      }
      
    </div>
  )
}

export default Header
