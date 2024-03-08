import { pool } from '../../../../config/db'
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'



export const GET = async () => {

    try {

        const cookieStore = cookies()
        const jwt :string | any = cookieStore.get('jwt')

        // delete the refresh token from the database
        if(jwt === '') {
            return NextResponse.json({
                message: "Something Went Wrong!"
            })
        }

        const response: any = await pool.query(
            `UPDATE Users
             SET refresh_token = NULL
             WHERE refresh_token = ?`,
            [jwt?.value]
        );
        

         // delete the refresh token from the cookies
         cookies().set('jwt', '')

        return response[0].length > 0 ? NextResponse.json({
            message: "Logout failed"
        }) : NextResponse.json({
            message: "Logout Successful"
        })
        
    } catch (error) {

        console.log(error)
        return NextResponse.json({
            message: "Something Went Wrong!"
        })
    }
}