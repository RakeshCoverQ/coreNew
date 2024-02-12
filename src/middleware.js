import { NextResponse } from 'next/server'
 
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/')) {
    console.log("request",request);
    return NextResponse.rewrite(new URL('/dashborad', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/underWriting', request.url))
  }
}