import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm, SignupForm } from "../../components";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const LoginPage = ({ headingColorValue }) => {
  const navigate = useNavigate();
  const [authState] = useAuth();
  useEffect(() => {
    authState.encodedToken && navigate("/notes");
  }, [authState]);
  return (
    <>
      <LoginForm headingColorValue={headingColorValue} />
    </>
  );
};

export default LoginPage;
