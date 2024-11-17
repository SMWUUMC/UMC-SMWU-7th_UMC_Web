import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
