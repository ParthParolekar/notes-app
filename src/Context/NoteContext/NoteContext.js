import { createContext, useContext, useReducer } from "react";
import { initialState, noteReducer } from "./NoteReducer";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [noteState, noteDispatch] = useReducer(noteReducer, initialState);
  return (
    <NoteContext.Provider value={[noteState, noteDispatch]}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => useContext(NoteContext);
