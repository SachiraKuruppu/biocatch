import { NextResponse, NextRequest } from 'next/server';
import { getUserFromToken } from './server-lib/auth';

export async function middleware(req: NextRequest) {
  const { cookies } = req;
  const jwt = cookies.get('session')?.value;
  const { pathname, origin } = req.nextUrl;

  const user = await getUserFromToken(jwt);

  if (pathname === '/login') {
    return user === undefined
      ? NextResponse.next()
      : NextResponse.redirect(`${origin}/dashboard`);
  }

  if (user === undefined) {
    return NextResponse.redirect(`${origin}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/login', '/api/payment']
};
