import "./App.css";
import Mockman from "mockman-js";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { CreateNote, Navbar, Sidebar } from "./components";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "./Context/AuthContext/AuthContext";
import { Archive, Labels, Notes, SignUpPage, Trash } from "./pages";
import { useState, useEffect } from "react";

function App() {
  const [filteredNotes, setFilteredNotes] = useState();
  const headingColorValue = useColorModeValue("gray.700", "gray.300");
  const [authState, authDispatch] = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("savedData"));
    savedData &&
      authDispatch({
        type: "HANDLE_USER_AUTH",
        payload: {
          foundUser: savedData.foundUser,
          encodedToken: savedData.encodedToken,
        },
      });
  }, [authState.encodedToken]);

  return (
    <div className="App">
      <Navbar headingColorValue={headingColorValue} onOpen={onOpen} />
      <Sidebar onClose={onClose} isOpen={isOpen} modalOnOpen={modalOnOpen} />
      <CreateNote
        setFilteredNotes={setFilteredNotes}
        modalIsOpen={modalIsOpen}
        modalOnClose={modalOnClose}
      />
      <Routes>
        <Route path="/Mockman" element={<Mockman />} />

        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/notes"
          element={
            <Notes
              modalOnOpen={modalOnOpen}
              setFilteredNotes={setFilteredNotes}
              filteredNotes={filteredNotes}
            />
          }
        />
        <Route
          path="/archive"
          element={<Archive modalOnOpen={modalOnOpen} />}
        />
        {/* <Route path="/labels" element={<Labels />} />
        <Route path="/trash" element={<Trash />} /> */}

        <Route
          path="/login"
          element={
            authState.encodedToken ? (
              <Navigate to="/notes" />
            ) : (
              <LoginPage headingColorValue={headingColorValue} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            authState.encodedToken ? (
              <Navigate to="/notes" />
            ) : (
              <SignUpPage headingColorValue={headingColorValue} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
