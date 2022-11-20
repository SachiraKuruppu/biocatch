import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import * as randomstring from 'randomstring';
import { setCustomerSessionId } from '../client-lib/biocatch';
import Navbar from '../components/navbar';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const sessionId = randomstring.generate(18);
    setCustomerSessionId(sessionId);
    console.log(`Customer session id set as ${sessionId}`);
  }, []);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
