import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  getCustomerSessionId,
  setCustomerSessionId,
  setContext
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
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setContext('dashboard');
    const savedCustomerSessionId = getCustomerSessionId();
    if (savedCustomerSessionId !== customerSessionId) {
      setCustomerSessionId(customerSessionId);
    }
  }, [customerSessionId]);

  const handlePayment = async () => {
    const response = await fetch('/api/payment');
    const jsonResponse = await response.json();
    setMessage(jsonResponse.message);
  };

  return (
    <main>
      <p>Hi {email},</p>
      <p>This is a mock dashboard with user account info</p>
      <button onClick={handlePayment}>Make Payment</button>
      <p>{message}</p>
    </main>
  );
}
