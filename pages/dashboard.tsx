import React, { useEffect } from 'react';
import {
  getCustomerSessionId,
  setCustomerSessionId
} from '../client-lib/biocatch';
import { getUserFromToken } from '../server-lib/auth';

export async function getServerSideProps(context: any) {
  const { cookies } = context.req;
  const jwt = cookies['session'];

  const user = await getUserFromToken(jwt);

  return { props: user };
}

export default function Dashboard({
  email,
  customerSessionId
}: {
  email: string;
  customerSessionId: string;
}) {
  useEffect(() => {
    const savedCustomerSessionId = getCustomerSessionId();
    if (savedCustomerSessionId !== customerSessionId) {
      setCustomerSessionId(customerSessionId);
    }
  }, [customerSessionId]);

  return (
    <main>
      <p>Hi {email},</p>
      <p>This is a mock dashboard with user account info</p>
      <button>Make Payment</button>
    </main>
  );
}
