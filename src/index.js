import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./Context/UserContext/UserContext";
import { NoteProvider } from "./Context/NoteContext/NoteContext";
import { FilterProvider } from "./Context/FilterContext/FilterContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NoteProvider>
        <FilterProvider>
          <UserProvider>
            <ChakraProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ChakraProvider>
          </UserProvider>
        </FilterProvider>
      </NoteProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
