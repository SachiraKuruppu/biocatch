import React, { createContext, ReactNode, useContext, useReducer } from 'react';

declare global {
  interface Window {
    cdApi: {
      setCustomerSessionId: (sessionId: string) => void;
      changeContext: (context: string) => void;
    };
  }
}

export enum ActionType {
  SET_SESSION_ID,
  SET_CONTEXT,
}

type Action = {
  type: ActionType;
  value: string;
};

type BioCatchContextState = {
  customerSessionId: string | null;
  context: string | null;
};

const initialState: BioCatchContextState = {
  customerSessionId: null,
  context: 'cs_auto',
};

const reducer = (state: BioCatchContextState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_SESSION_ID:
      window.cdApi.setCustomerSessionId(action.value);
      return { ...state, customerSessionId: action.value };
    case ActionType.SET_CONTEXT:
      window.cdApi.changeContext(action.value);
      return { ...state, context: action.value };
    default:
      return state;
  }
};

export const BioCatchContext = createContext<{
  state: BioCatchContextState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: (action: Action) => null
});

export const BioCatchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BioCatchContext.Provider value={{state, dispatch}}>
      {children}
    </BioCatchContext.Provider>
  )
};

export const useBioCatch = () => useContext(BioCatchContext)
