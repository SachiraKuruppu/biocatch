import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../styles/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/login">Login</Link>
      <Link
        href=""
        onClick={async () => {
          const response = await fetch('/api/logout', {
            method: 'POST'
          });

          router.push('/');
        }}
      >
        Logout
      </Link>
    </div>
  );
}
