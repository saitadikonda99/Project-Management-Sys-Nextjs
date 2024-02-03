import React from 'react'
import './sidebar.css'

//imports icons here 
import { IoMdGitMerge } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";

const sidebar = () => {
  return (
        <div className="SidebarComponent">
            <div className="SidebarComponent-in">
                <div className="SidebarOne">
                    <div className="SidebarOne-in">
                        <IoMdGitMerge />
                         <p>PMS</p>
                    </div>
                </div>
                <div className="SidebarTwo side-icon">
                    <div className="SidebarTwo-in side-icon-in">
                        <AiFillHome />
                        <p>Home</p>
                    </div>
                </div>
                <div className="SidebarThree side-icon">
                    <div className="SidebarThree-in side-icon-in">
                        <CgProfile />
                        <p>Profile</p>
                    </div>
                </div>
                <div className="SidebarThree side-icon">
                    <div className="SidebarThree-in side-icon-in">
                         
                    </div>
                </div>
                <div className="SidebarFour side-icon">
                    <div className="SidebarFour-in side-icon-in">
                         
                    </div>
                </div>
                <div className="SidebarFive side-icon">
                    <div className="SidebarFive-in side-icon-in">
                         
                    </div>
                </div>
                <div className="SidebarSix side-icon">
                    <div className="SidebarSix-in side-icon-in">
                         
                    </div>
                </div>
                <div className="SidebarSeven side-icon">
                    <div className="SidebarSeven-in side-icon-in">
                         
                    </div>
                </div>

                <div className="Sidebar-logout">
                    <div className="Sidebar-logout-in">
                        <RiLogoutCircleLine />
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default sidebar