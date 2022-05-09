import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "../../components";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const SignUpPage = ({ headingColorValue }) => {
  const navigate = useNavigate();
  const [authState] = useAuth();
  useEffect(() => {
    authState.encodedToken && navigate("/notes");
  }, [authState]);
  return <SignupForm headingColorValue={headingColorValue} />;
};

export default SignUpPage;
