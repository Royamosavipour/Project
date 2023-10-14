import React from "react";
import Users from "./Users/Users";
import { Outlet } from "react-router-dom";

export default function index() {
  return (
    <>
      <div>index</div>
      <Outlet />
    </>
  );
}
