import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

import styled from "styled-components";
const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full viewport height */
`;
const OutletWrapper = styled.div`
  flex: 1; /* Take up remaining space */
  padding: 20px; /* Add padding around the content */
  height: 100%;
`;
const RootLayout = () => {
  return (
    <>
      <LayoutContainer>
        <Navbar />
        <div style={{display: 'flex', flex: 'row'}}>
          <Sidebar />
          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
        </div>
      </LayoutContainer>
    </>
  );
};

export default RootLayout;