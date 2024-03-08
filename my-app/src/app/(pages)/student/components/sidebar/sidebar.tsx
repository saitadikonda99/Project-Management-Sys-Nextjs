"use client"
import React from 'react'
import './sidebar.css'


// import components here 
import useLogout from '../../../../hooks/useLogout'


//imports icons here 
import { IoMdGitMerge } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";


const sidebar = () => {

    const logout = useLogout();

    const handleClick = () => {
        logout();
    }
     
  return (
        <div className="SidebarComponent">
            <div className="SidebarComponent-in">
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
  )
}

export default sidebar