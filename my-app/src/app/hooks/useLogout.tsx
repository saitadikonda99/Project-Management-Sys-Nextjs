"use client"
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const useLogout = () => {

    const Router = useRouter()

    const logout = async () => {
        try {
            const response = await axios.get('/api/auth/logout')
            console.log(response)
            toast.success('Logged out successfully')
            Router.push('/auth/login')
        } catch (error) {
            toast.error('login first')
            console.log(error)
        }
    }

    return logout;
}

export default useLogout