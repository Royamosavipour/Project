import React, { useContext } from "react";
import AuthContext from "../../Context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function PadminPrivet({ children }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>{authContext.userInfos.role === "ADMIN" ? (<>{children }</>) : navigate("/login")}</>
  );
}
