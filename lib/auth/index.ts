import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET = process.env.SECRET as string;

export function generateSignedToken(user: { id: number; email: string }) {
  return sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3, // 3 days
      id: user.id,
      username: user.email
    },
    SECRET
  );
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
