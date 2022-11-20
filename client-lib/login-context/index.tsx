import React, { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

export const LoginContext = createContext({
  isLoggedIn: false,
  setLoggedIn: (isLoggedIn: boolean) => {}
});

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isCurrentlyLoggedIn = localStorage.getItem('isLoggedIn');
    setLoggedIn(isCurrentlyLoggedIn ? isCurrentlyLoggedIn === '1' : false);
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? '1' : '0');
  }, [isLoggedIn]);
  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}
