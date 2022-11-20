import { serialize } from 'cookie';
import { SignJWT, jwtVerify } from 'jose';

const SECRET = process.env.SECRET as string;

export async function generateSignedToken(user: {
  id: number;
  email: string;
  customerSessionId: string;
}) {
  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 60 * 60 * 24 * 3;

  return new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(expiry)
    .setIssuedAt(now)
    .setNotBefore(now)
    .sign(new TextEncoder().encode(SECRET));
}

export function getSerializedCookie(token: string) {
  return serialize('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 3,
    path: '/'
  });
}

export async function getUserFromToken(jwt: string | undefined) {
  if (jwt === undefined) {
    return undefined;
  }

  try {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(SECRET));
    return payload;
  } catch (error) {
    console.error('Error occurred while verifying the JWT token', error);
  }

  return undefined;
}
