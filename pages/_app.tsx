import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import * as randomstring from 'randomstring';
import {
  getCustomerSessionId,
  setCustomerSessionId
} from '../client-lib/biocatch';
import { LoginProvider } from '../client-lib/login-context';
import Navbar from '../components/navbar';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const csid = getCustomerSessionId() ?? randomstring.generate(18);
    setCustomerSessionId(csid);
    console.log(`Customer session id set as ${csid}`);
  }, []);

  return (
    <LoginProvider>
      <Navbar />
      <Component {...pageProps} />
    </LoginProvider>
  );
}
