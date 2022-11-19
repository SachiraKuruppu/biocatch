import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import * as randomstring from 'randomstring';
import { setCustomerSessionId } from '../client-lib/biocatch';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const sessionId = randomstring.generate(18);
    setCustomerSessionId(sessionId);
    console.log(`Customer session id set as ${sessionId}`);
  });

  return <Component {...pageProps} />;
}
