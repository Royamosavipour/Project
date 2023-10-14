import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/AdminPanel/SideBar/SideBar";

export default function index() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
