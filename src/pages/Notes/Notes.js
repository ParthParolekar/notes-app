import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const Notes = () => {
  const data = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [authState] = useAuth();

  useEffect(() => {
    !authState.encodedToken && navigate("/login");
  }, [authState.encodedToken]);

  return <div>Welcome , {authState.foundUser.firstName}</div>;
};

export default Notes;
