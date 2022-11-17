import '../styles/globals.css'
import Script from 'next/script'
import { BioCatchProvider } from '../contexts/biocatch'
import type { AppProps } from 'next/app'
import { useState } from 'react';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <BioCatchProvider>
      <Component {...pageProps} />
    </BioCatchProvider>
  )
}
