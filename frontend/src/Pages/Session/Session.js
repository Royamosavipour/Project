import React from "react";
import TopBar from "../../Components/TopBar/TopBar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";

export default function Session() {

  const {courseName, sessionID} =useParams()

  return (
    <>
      <TopBar />
      <Navbar />
      <Footer />
    </>
  );
}
