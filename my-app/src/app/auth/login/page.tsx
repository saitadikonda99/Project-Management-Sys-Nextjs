"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast';
import Image from 'next/image'
import './page.css'


// import images here 

import LoginImg from '../../assets/Login.png'

type user = {
    username: string,
    password: string
}

const Login = () => {

    const [userData, setUserData] = useState<user>({
        username: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async () => {
            try {
                setLoading(true)
                const response = await axios.post('/api/auth/login', userData)

                if(response.data.status === 200) {
                    router.push('/Home')
                } 
                if(response.data.status === 401) {
                    toast.error('Invalid credentials')
                }
                if(response.data.status === 500) {
                    toast.error('Internal server error')
                }
                
                console.log(response)
            } catch (error) {
                alert('Internal server error')
            } finally {
                setLoading(false)
            }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = () => {
        router.push('/auth/signup')
    }
    
  return (
        <div className="LoginComponent">
            {loading && <div className="Loader">Loading...</div>}
            <div className="LoginComponent-in">
                <div className="LoginComponent-in-in">
                    <div className="Login-in-one">
                        <div className="Login-one">
                            <div className="Login-one-in">
                                <div className="Login-one-one">
                                    <h1>Welcome Back</h1>
                                    <p>Login to get started</p>
                                </div>
                                <div className="Login-one-two">
                                    <div className="Login-one-two-in">
                                        <div className="Login-input-one">
                                            <input 
                                                type="text"
                                                placeholder='username'
                                                name='username'
                                                value={userData.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="Login-input-two">
                                            <input 
                                                type="password" 
                                                placeholder='password'
                                                name='password'
                                                value={userData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="Login-input-three">
                                            <button onClick={handleSubmit}>Login</button>
                                        </div>
                                    </div>
                                    <div className="Login-one-two-in-in">
                                        <div className="Login-one-two-in-in-one">
                                            <div className="Login-cr-one">
                                                OR
                                            </div>
                                            <div className="Login-cr-two" onClick={handleSignup}>
                                                <button>
                                                    Singup
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Login-two">
                            <Image
                                src={LoginImg}
                                alt="Login Image"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login


                // <input 
                //     type="text"
                //     placeholder='username'
                //     name='username'
                //     value={userData.username}
                //     onChange={handleChange}
                // />
                // <input 
                //     type="password" 
                //     placeholder='password'
                //     name='password'
                //     value={userData.password}
                //     onChange={handleChange}
                // />
                // <button onClick={handleSubmit}>Login</button>