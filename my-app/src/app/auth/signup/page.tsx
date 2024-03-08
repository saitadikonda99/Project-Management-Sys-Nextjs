"use client"
import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import './page.css'


type user = {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    gender: string,
    branch: string,
    password: string,
    confirmPassword: string,
    phone: string
    address: string,
    residence: string,
    profile_pic: string,
}

const Sign = () => {

    const [userData, setUserData] = useState<user>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        gender: '',
        password: '',
        branch: '',
        confirmPassword: '',
        phone: '',
        address: '',
        residence: '',
        profile_pic: 'NA',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleBranch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            if(userData.password !== userData.confirmPassword) {
                alert('passwords do not match')
                return
            }
             
            if (!userData.firstName || !userData.lastName || !userData.username || !userData.email || !userData.gender || !userData.password || !userData.branch || !userData.confirmPassword || !userData.phone || !userData.address || !userData.residence || !userData.profile_pic) {
                alert('Please fill all the fields')
                return
            }
            
            const response = await axios.post('/api/auth/signup', userData)
            
            if(response.data.status === 200) {
                toast.success('Account created successfully')
            }
            if(response.data.status === 201) {
                toast.error('Invalid Username')
            }
            if(response.data.status === 204) {
                toast.error('Invalid year')
            }
            if(response.data.status === 500) {
                toast.error('Internal server error')
            }
            

        } catch (error) {
            console.log(error)
        }
    }

  return (
        <div className="SignComponent">
            <div className="SignComponent-in">

                <div className="SignComponent-in-in">
                    
                    <div className="Sign-up-one">
                        <div className="Sign-up-one-one">
                            <input 
                                type="text" 
                                placeholder='firstName'
                                name='firstName'
                                value={userData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="Sign-up-one-two">
                            <input 
                                type="text" 
                                placeholder='lastName'
                                name='lastName'
                                value={userData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="Sign-up-two">
                        <div className="Sign-up-two-one">
                            <input 
                                type="text" 
                                placeholder='username'
                                name='username'
                                value={userData.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="Sign-up-two-two">
                            <input 
                                type="text" 
                                placeholder='email'
                                name='email'
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className="Sign-up-three">
                        <div className="Sign-up-three-one">
                            <select 
                                name="gender"
                                value={userData.gender}
                                onChange={handleBranch} 
                            >   
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="FeMale">FeMale</option>

                            </select>
                        </div>
                        <div className="Sign-up-three-two">
                            <select 
                                name="residence"
                                value={userData.residence}
                                onChange={handleBranch} 
                            >   
                                <option value="">Select Residence</option>
                                <option value="H">Hostler</option>
                                <option value="D">DayScholar</option>

                            </select>
                        </div>
                        <div className="Sign-up-three-three">
                            <input 
                                type="text" 
                                placeholder='address'
                                name='address'
                                value={userData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className="Sign-up-four">
                        <div className="Sign-up-four-one">
                            <select 
                                name="branch"
                                value={userData.branch}
                                onChange={handleBranch} 
                            >   
                                <option value="">Select Branch</option>
                                <option value="CSE">CSE</option>
                                <option value="ECE">ECE</option>
                                <option value="EEE">EEE</option>

                            </select>
                        </div>

                        <div className="Sign-up-four-two">
                            <input 
                                type="text"
                                placeholder='password'
                                name='password'
                                value={userData.password}
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="Sign-up-four-three">
                            <input 
                                type="text"
                                placeholder='confirmPassword'
                                name='confirmPassword'
                                value={userData.confirmPassword}
                                onChange={handleChange} 
                            />
                        </div>
                    </div>


                    <div className="Sign-up-five">
                        <div className="Sign-up-five-one">
                            <input 
                                type="text" 
                                placeholder='phone'
                                name='phone'
                                value={userData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="Sign-up-five-two">
                            <button onClick={handleSubmit}>SignUp</button>    
                        </div>
                    </div>  

                </div>

                <div className="SignComponent-login">
                    <p>Already have an account?</p>
                    <Link href="/auth/login">Login</Link>
                </div>

            </div>
        </div>
  )
}

export default Sign