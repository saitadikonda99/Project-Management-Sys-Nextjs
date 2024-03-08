import React from 'react'
import './page.css'
import Image from 'next/image'


// imports start here
import Sidebar from '../components/sidebar/sidebar'
import { IoMdNotificationsOutline } from "react-icons/io";


// imports images here
import Profile from '../../../assets/Profile.png'


const Student = () => {

  return (
        <div className="StudentComponent">
            <div className="StudentComponent-in">
                 <div className="StudentComponent-in-in">
                    <div className="Student-sidebar">
                        <div className="Student-sidebar-in">
                            <Sidebar />
                        </div>
                    </div>

                    <div className="StudentHome">
                        <div className="StudentHome-in">   

                            <div className="S-home-one">
                                <div className="S-home-one-in">
                                     <div className="S-h-o-one">
                                        <input type="text" placeholder='Search'/>
                                     </div>
                                     <div className="S-h-o-two">
                                        <div className="S-h-o-two-icon">
                                            <IoMdNotificationsOutline className='Notification-icon'/>
                                        </div>
                                        <div className="S-h-o-two-id">
                                            <p>2200030805</p>
                                        </div>
                                        <div className="S-h-o-two-image">
                                            <Image 
                                                src={Profile}
                                                alt='image'
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                     </div>
                                </div>
                            </div>
                            
                            <div className="S-home-two">
                                <div className="S-home-two-in">
                                    <div className="S-home-stats">
                                        <div className="S-home-stats-one">
                                            <div className="S-home-stats-one-p">
                                                <p>Overview</p>
                                            </div>
                                            <div className="S-home-stats-one-graph">
                                                 <div className="S-home-stats-one-graph-in">
                                                    <div className="S-home-Stat-one">
                                                        <div className="S-home-st-profile">
                                                            <Image 
                                                                src={Profile}
                                                                alt='image'
                                                                width={50}
                                                                height={50}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="S-home-Stat-two">
                                                        stat 1 
                                                    </div>
                                                    <div className="S-home-Stat-three">
                                                        stat 2 
                                                    </div>
                                                 </div>
                                            </div>
                                        </div>
                                        <div className="S-home-stats-two">
                                             <div className="S-home-stats-two-in">
                                                <div className="S-home-stats-two-in-one">

                                                </div>
                                                <div className="S-home-stats-two-in-two">

                                                </div>
                                                <div className="S-home-stats-two-in-three">

                                                </div>
                                             </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default Student