import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <div style={{ marginTop: "44px", marginLeft: "150px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
