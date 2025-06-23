import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value

    const protectedPaths = ['/dashboard', '/profile', '/home','/auth/login','/products']

    if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }

    return NextResponse.next()
}
