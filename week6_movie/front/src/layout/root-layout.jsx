import {Outlet} from "react-router-dom";
import Navbar from "../component/navbar.jsx";
import Sidebar from "../component/sidebar.jsx";
import styled from "styled-components";
import { AuthProvider } from "../context/AuthProvider.jsx";
import { UserProvider } from "../context/NicknameProvider.jsx";

const MainContent = styled.div`
  margin-left: 182px;
  background-color: #282828;
  min-height: 100vh;
  color: white;
`;

const OutletContainer = styled.div`
  padding-top: 60px;
  padding-left: 20px;
  border: 1px solid #282828;

`;

const RootLayout = () => {
    return (
        <AuthProvider>
          <UserProvider>
            <Navbar/>
              <Sidebar/>
              <MainContent>
                <OutletContainer>
                   <Outlet />
                </OutletContainer>
              </MainContent>
          </UserProvider>
        </AuthProvider>
    );
};

export default RootLayout;

