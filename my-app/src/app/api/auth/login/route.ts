import { pool } from '../../../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server';


const verifyPassword = async (password: string, salt: string, hashedPassword: string,) => {
    const hashedInputPassword = await bcrypt.hash(password, salt);
    return hashedInputPassword === hashedPassword;
  };



const isAuth = async (username:string, password:string) => {
        try {
            
            const response = await pool.query(`
                SELECT * FROM users WHERE username = ?
            `, [username]);

            const users = response[0] as any[];

            const user = users[0];

            if (!user) {
                return false;
            }

            const isValidpass = await verifyPassword(password, user.salt, user.password);

            if (!isValidpass) {
                return false;
            }

            return user;

        } catch (error) {
            console.log(error)
            return false;
        }
}


export const POST = async (req:NextRequest, res:NextResponse) => {

    const { username, password } = await req.json();

    try {
         
        const user = await isAuth(username, password);

        if (!user) {
            return NextResponse.json({message: 'Invalid username or password', status: 401})
        }

        // get the role from the db 

        const role = await pool.query(`
            SELECT role FROM users WHERE username = ?
        `, [username]);
         
        const roles = role[0] as any[];

         // create a JWT token 

        const accessToken = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: roles[0].role
            }, 
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '15m',  algorithm: 'HS256'  },
         );

         // refresh token

        const refreshToken = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: roles[0].role
            },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '15m', algorithm: 'HS256' },
        )

        // save the refresh token into the database of the users table 

        await pool.query(`
            UPDATE users SET refresh_token = ? WHERE username = ?
        `, [refreshToken, username]);

        // set the cookie max age to 1day 

        // set the cookie with refresh token
        cookies().set('jwt', refreshToken, {
            sameSite: 'lax',
            secure: false,
            httpOnly: false,
            maxAge: 15 * 60 * 1000,
        })

        return NextResponse.json(
            {
                message: 'Login successful',
                id: user.id,
                username: user.username,
                role: roles[0].role,
                accessToken: accessToken,
                refreshToken: refreshToken,
                status : 200
            }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error, status: 500})
    }
}   