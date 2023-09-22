import React from "react";
import TopBar from "../TopBar/TopBar";
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/Landing";

import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <TopBar />
      <Navbar />
      <Landing />
    </header>
  );
}
