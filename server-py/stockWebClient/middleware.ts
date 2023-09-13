import { cookies } from 'next/dist/client/components/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // const token: any = request.cookies.get("token")
    // if(token === undefined){
    //     return NextResponse.redirect(new URL(`/user/login?redirect=${request.nextUrl.pathname}`, request.url))
    // } else {
        return NextResponse.next()
    // }
}

export const config = {
    matcher: ["/post/write", "/"]
}
