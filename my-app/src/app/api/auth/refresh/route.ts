import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import { pool } from '../../../../config/db';
import { jwtVerify } from "jose";

const getJWT = async (refresh_token: String) => {
    try {

        const { payload, protectedHeader } = await jwtVerify(
            refresh_token as string,
            new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET as string),
            {
                algorithms: ['HS256'],
            }  
        );

        return payload;

    } catch (error) {
        return 'Invalid token'   
    }
}


const refreshTokenHandler = async (refreshToken: string, res: NextResponse) => {
        try {

            const JWTData = await getJWT(refreshToken);
            const user = JWTData as any;

            const userData: any = pool.query(
                `SELECT * FROM users WHERE username = ?`,
                [user.username],
            )
            
            if(userData[0].length === 0) {
                return NextResponse.json({message: 'Invalid token', status: 401})
            }
            
            const accessToken = jwt.sign(
                {
                    id: userData.id,
                    username: userData.username,
                    role: userData.role
                }, 
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '30s',  algorithm: 'HS256'  },
             );
             
             return NextResponse.json(
                {
                    message : 'refresh token successful',
                    id : userData.id,
                    username: userData.username,
                    role: userData.role,
                    accessToken,
                    status: 200,
                });

        } catch (error) {
            return NextResponse.json({message: 'Invalid token', status: 401})
        }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
        const cookie = cookies().get('jwt')?.value

        if(!cookie) {
            return NextResponse.json({message: 'Invalid token', status: 401})
        }
        
        const refreshToken = cookie;

        return await refreshTokenHandler(refreshToken, res);
}