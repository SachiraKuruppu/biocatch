import { NextApiRequest, NextApiResponse } from 'next';

const SECRET = process.env.SECRET;

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  console.log(username, password);
}
