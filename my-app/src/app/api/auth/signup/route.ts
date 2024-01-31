import { pool } from '../../../../config/db';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { salt, hashedPassword };
  };


export const POST = async (req:NextRequest, res:NextResponse): Promise<NextResponse>  => {

     

    const { firstName, lastName, username, email, branch, password, phone, address, gender, residence, profile_pic } = await req.json();



    try {

        const userRegex = /^[0-9]{10}$/;

        if (!userRegex.test(username)) {
            return NextResponse.json({
                message: 'Invalid username', status: 201
            });
        }

        let getyear = parseInt(username.slice(0, 2));
            const presentyear = getyear + 2000;

            const currentyear = new Date().getFullYear();


            const year = currentyear - presentyear;

            if(year < 0 || year > 4) {
                return NextResponse.json({
                    message: 'Invalid year', status: 204
                });
            }

        const { salt, hashedPassword } = await hashPassword(password);

        await pool.query('BEGIN');

        const response = await pool.query(`
            INSERT INTO users (username, password, salt)
            VALUES (?, ?, ?)
            `, [username, hashedPassword, salt]
        );

        const userIdResult = await pool.query(`
            SELECT id FROM users WHERE username = ?
            `, [username]
        );

        const users = userIdResult[0] as any[];
        
        const userId = users[0].id;


        const response2 = await pool.query(
            `INSERT INTO user_details (user_id, firstName, lastName, year, email, branch, phone, address, gender, residence, profile_pic)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [userId, firstName, lastName, year, email, branch, phone, address, gender, residence, profile_pic]    
        )

        await pool.query('COMMIT');
            
        return NextResponse.json({message: 'User created successfully', status: 200})

    } catch (error) {
        
        await pool.query('ROLLBACK');
        
        return NextResponse.json({message: error, status: 500})
    }
}