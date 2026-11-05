import { NextResponse } from 'next/server'
import { auth } from './lib/auth'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: request.headers
    })
    const user = session?.user
    if (!user) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set(
            'callbackURL',
            `${request.nextUrl.pathname}${request.nextUrl.search}`
        )
        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/add-studio', '/my-listings', '/studios/edit/:path', '/my-bookings'],

}
