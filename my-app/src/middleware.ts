import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { verifyJWT } from './lib/verifyJWT'

 
export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname

    const isPublic = path === '/auth/login' || path === '/auth/register' || path === '/'
    
    const cookieStore = cookies()
    const JWT = cookieStore.get('jwt')?.value

    const decodedToken = jwt.decode(
        cookieStore.get('jwt')?.value as string,
        {complete: true}
    )
 
    const roles: any = decodedToken?.payload

    const isValid = await verifyJWT()

    if(path === '/') {
        return NextResponse.rewrite(new URL('/auth/login', request.url))
    }
    
    if(path === '/auth/login' && JWT) {
        if(roles.role === 'Admin') {
            return NextResponse.redirect(new URL('/Admin', request.url))
        }
        if(roles.role === 'Student') {
            return NextResponse.redirect(new URL('/Home', request.url))
        }
    }

    if(isPublic && !isValid) {
        return NextResponse.next()
    }

    if(isPublic && JWT) {
       return NextResponse.next()
    }

    if(!isPublic && !JWT) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }


    // allow only admin to access admin routes  
    if(path.startsWith('/Admin') && (isValid === false || roles?.role != 'Admin')) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    } 

    
    // private routes for only students
    if(path.startsWith('/student') && (isValid === false || roles?.role != 'Student')) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    
    return NextResponse.next()

}
 
// Supports both a single string value or an array of matchers
export const config = {
    matcher: [
        '/',
        '/Home',
        '/auth/login',
        '/Admin/:path*'
    ],
}