import React from 'react';

declare global {
  interface Window {
    cdApi: {
      setCustomerSessionId: (sessionId: string) => void;
      changeContext: (context: string) => void;
    };
  }
}

export function setCustomerSessionId(sessionId: string) {
  window.cdApi.setCustomerSessionId(sessionId);
}

export function setContext(pageName: string) {
  window.cdApi.changeContext(pageName);
}
