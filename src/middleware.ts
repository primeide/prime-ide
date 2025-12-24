import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const session = await auth()
    const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login')
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

    // Redirect to login if accessing admin pages without session
    if (isAdminPage && !isLoginPage && !session) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Redirect to admin dashboard if accessing login while authenticated
    if (isLoginPage && session) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin/:path*',
}
