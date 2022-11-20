import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { LoginContext } from '../../client-lib/login-context';
import styles from '../../styles/Navbar.module.css';

export default function Navbar() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <div className={styles.container}>
      <Link href="/">Home</Link>
      {isLoggedIn && <Link href="/dashboard">Dashboard</Link>}
      {!isLoggedIn && <Link href="/login">Login</Link>}
      {isLoggedIn && <Link href="/logout">Logout</Link>}
    </div>
  );
}
