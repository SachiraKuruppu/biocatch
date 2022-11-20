import Router from 'next/router';
import React, { useContext, useState } from 'react';
import { getCustomerSessionId } from '../client-lib/biocatch';
import { LoginContext } from '../client-lib/login-context';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useContext(LoginContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = { username, password };

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...credentials,
        customerSessionId: getCustomerSessionId()
      })
    });

    if (response.status === 200) {
      setLoggedIn(true);
      Router.push('/dashboard');
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </main>
  );
}
