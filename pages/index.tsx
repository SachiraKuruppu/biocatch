import Head from 'next/head';
import { useEffect } from 'react';
import { setContext } from '../client-lib/biocatch';
import styles from '../styles/Home.module.css';

export default function Home() {
  useEffect(() => {
    setContext('Home');
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Biocatch Demo</title>
        <meta name="description" content="Biocatch demo nextjs app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to the demo application</h1>
      </main>
    </div>
  );
}
