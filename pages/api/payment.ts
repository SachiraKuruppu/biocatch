import { NextApiRequest, NextApiResponse } from 'next';
import { getBioCatchScore } from '../../server-lib/biocatch';
import { getUserFromToken } from '../../server-lib/auth';

export default async function Payment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies } = req;
  const jwt = cookies.session;
  const user = (await getUserFromToken(jwt)) as
    | { email: string; customerSessionId: string }
    | undefined;

  if (user === undefined) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const isScoreOk = await getBioCatchScore(
    user?.customerSessionId,
    user?.email,
    'MAKE_PAYMENT'
  );

  if (isScoreOk) {
    return res.status(200).json({ message: 'Payment successful' });
  }

  return res.status(400).json({ message: 'Payment failed' });
}
