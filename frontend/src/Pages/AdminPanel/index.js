import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/AdminPanel/SideBar/SideBar";
import Topbar from "../../Components/AdminPanel/TopBar/Topbar";

import "./index.css";

export default function index() {
  return (
    <>
      <div className="content">
        <Sidebar />
        <div id="home" className="col-10">
          <Topbar />
          <div class="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
