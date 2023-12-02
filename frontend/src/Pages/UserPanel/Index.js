import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/UserPanel/SideBar/SideBar";

import "./Index.css";
import { Outlet } from "react-router-dom";

export default function Index() {
  return (
    <>
      <TopBar />
      <Navbar />

      <section class="content">
        <div class="content-header">
            <div class="container">
                <span class="content-header__title">حساب کاربری من</span>
                <span class="content-header__subtitle">پیشخوان</span>
            </div>
        </div>
        <div class="content-main">
            <div class="container">
                <div class="row">
                    <Sidebar />

                    <Outlet />

                </div>
            </div>
        </div>
    </section>
 

      <Footer />
    </>
  );
}
