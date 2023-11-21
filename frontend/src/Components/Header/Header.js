import React, { useEffect, useState } from "react";
import TopBar from "../TopBar/TopBar";
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/Landing";

import "./Header.css";
import { json } from "react-router-dom";

export default function Header() {
  const [indexInfo, setIndexInfo] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/index`)
      .then((res) => res.json())
      .then((allInfo) => {
        console.log(allInfo);
      });
  }, []);
  return (
    <header className="header">
      <TopBar />
      <Navbar />
      <Landing />
    </header>
  );
}
