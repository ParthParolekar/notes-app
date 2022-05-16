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

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NoteProvider>
        <UserProvider>
          <ChakraProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChakraProvider>
        </UserProvider>
      </NoteProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
