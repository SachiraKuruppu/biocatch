import { NextApiRequest, NextApiResponse } from 'next';
import * as argon2 from 'argon2';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET = process.env.SECRET as string;

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  // Here I simulate the user login flow, without using an actual db
  // check if user exist in the db
  // Get the hashed password for the username from the db
  const user = {
    id: 1,
    email: 'user@gmail.com',
    hashedPassword:
      '$argon2id$v=19$m=65536,t=3,p=4$tNn5u/lBRHsbFffnPVmLxw$xYpjkjNeu56pWUFMBd2KAOVFAUUo/6GqTnGtGMzrnlY'
  };

  if (
    user.email === username &&
    (await argon2.verify(user.hashedPassword, password))
  ) {
    const token = generateSignedToken(user);
    const serializedCookie = serialize('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 3,
      path: '/'
    });

    res.setHeader('Set-Cookie', serializedCookie);
    res.status(200).json({ message: 'Success' });
    return;
  }

  res.status(401).json({ message: 'Invalid credentials' });
}

function generateSignedToken(user: { id: number; email: string }) {
  return sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3, // 3 days
      id: user.id,
      username: user.email
    },
    SECRET
  );
}
