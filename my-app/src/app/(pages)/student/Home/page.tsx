import React from 'react'
import './page.css'


// imports start here
import Sidebar from '../components/sidebar/sidebar'

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
                            <h1>Student Dashboard</h1>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default Student