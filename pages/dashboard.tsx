import React from 'react';
import { getUserFromToken } from '../lib/auth';

export async function getServerSideProps(context: any) {
  const { cookies } = context.req;
  const jwt = cookies['session'];

  const user = await getUserFromToken(jwt);
  console.log(user);

  return { props: user };
}

export default function Dashboard({ email }: { email: string }) {
  return (
    <main>
      <p>Hi {email},</p>
      <p>This is a mock dashboard with user account info</p>
      <button>Make Payment</button>
    </main>
  );
}
