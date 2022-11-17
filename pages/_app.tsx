import '../styles/globals.css'
import Script from 'next/script'
import { BioCatchProvider } from '../contexts/biocatch'
import type { AppProps } from 'next/app'
import { useState } from 'react';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://bcdn-4ff4f23f.we-stats.com/scripts/4ff4f23f/4ff4f23f.js" />
      <BioCatchProvider>
        <Component {...pageProps} />
      </BioCatchProvider>
    </>
  )
}
