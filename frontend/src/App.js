import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./Context/authContext";

export default function App() {
  const router = useRoutes(routes);

  return (
    <AuthContext.Provider>
  
  {router}
  </AuthContext.Provider>);
}
