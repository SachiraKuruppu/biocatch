import React from 'react';

declare global {
  interface Window {
    cdApi: {
      setCustomerSessionId: (sessionId: string) => void;
      changeContext: (context: string) => void;
    };
  }
}

const LOCAL_STORAGE_KEY = 'BIOCATCH_SESSION_ID';

export function setCustomerSessionId(sessionId: string) {
  window.cdApi.setCustomerSessionId(sessionId);
  sessionStorage.setItem(LOCAL_STORAGE_KEY, sessionId);
}

export function setContext(pageName: string) {
  window.cdApi.changeContext(pageName);
}

export function getCustomerSessionId() {
  return sessionStorage.getItem(LOCAL_STORAGE_KEY);
}
