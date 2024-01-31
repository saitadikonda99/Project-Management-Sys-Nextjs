"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast';

type user = {
    username: string,
    password: string
}

const Login = () => {

    const [userData, setUserData] = useState<user>({
        username: '',
        password: ''
    })

    const router = useRouter()

    const handleSubmit = async () => {
            try {
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
            }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    
  return (
        <div className="LoginComponent">
            <div className="LoginComponent-in">
                <input 
                    type="text"
                    placeholder='username'
                    name='username'
                    value={userData.username}
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    placeholder='password'
                    name='password'
                    value={userData.password}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
  )
}

export default Login