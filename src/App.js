import "./App.css";
import Mockman from "mockman-js";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Navbar } from "./components";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useColorModeValue } from "@chakra-ui/react";
import { useAuth } from "./Context/AuthContext/AuthContext";
import { Notes, SignUpPage } from "./pages";
import { useEffect } from "react";

function App() {
  const headingColorValue = useColorModeValue("gray.700", "gray.300");
  const [authState, authDispatch] = useAuth();
  const navigate = useNavigate();

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
      <Navbar headingColorValue={headingColorValue} />

      <Routes>
        <Route path="/Mockman" element={<Mockman />} />

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/notes" element={<Notes />} />

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
