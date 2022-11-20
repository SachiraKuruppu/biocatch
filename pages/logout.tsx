import Router, { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../client-lib/login-context';
import styles from '../styles/Home.module.css';

export default function Login() {
  const router = useRouter();
  const { setLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    fetch('/api/logout', {
      method: 'POST'
    }).then(() => {
      setLoggedIn(false);
      router.push('/');
    });
  });

  return (
    <main className={styles.main}>
      <h1>Login out...</h1>
    </main>
  );
}
