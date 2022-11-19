import { NextApiRequest, NextApiResponse } from 'next';
import { getSerializedCookie } from '../../lib/auth';

export default function Logout(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;
  const jwt = cookies.session;

  if (jwt) {
    const serializedCookie = getSerializedCookie('');
    res.setHeader('Set-Cookie', serializedCookie);
  }

  return res.status(200).json({ message: 'Success' });
}
