import { createContext, useContext, useReducer } from "react";
import { intitalState, userReducer } from "./UserReducer";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, intitalState);
  return (
    <userContext.Provider value={[userState, userDispatch]}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
