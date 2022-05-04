import React, { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "./AuthReducer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={[authState, authDispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
