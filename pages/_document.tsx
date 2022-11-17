import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import React from 'react'

export default function Document() {
  return (
    <Html>
      <Head>
        <Script src="https://bcdn-4ff4f23f.we-stats.com/scripts/4ff4f23f/4ff4f23f.js" strategy='beforeInteractive' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}