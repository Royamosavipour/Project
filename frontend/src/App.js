import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./Context/authContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState({});
  const login = (token) => {
    setToken(token);
    localStorage.setItem("user", JSON.stringify({ token }));
  };
  const logout=()=>{
    setToken(null)
    userInfos({})
    localStorage.removeItem('user')
  }

  const router = useRoutes(routes);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,  // isloggedIn:isloggedIn
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}
