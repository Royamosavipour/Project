import React, { useCallback, useEffect, useState } from "react";
import { json, useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./Context/authContext";

export default function App() {
  const router = useRoutes(routes);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState({});

  const login = useCallback((userInfos,token) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("user", JSON.stringify({ token }));
  },[])

  const logout =useCallback( () => {
    setToken(null);
    userInfos({});
    localStorage.removeItem("user");
  },[])

  useEffect(() => {
    const localStorgeData = JSON.parse(localStorage.getItem("user"));
    if (localStorgeData) {
      fetch(`http://localhost:4000/v1/auth/me`,{
        headers:{'Authorization':`Bearer ${localStorgeData.token}`}
      }).then(res=>res.json())
      .then(data=>{
        setIsLoggedIn(true)
        setUserInfos(data)
      })
      
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn, // isloggedIn:isloggedIn
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
