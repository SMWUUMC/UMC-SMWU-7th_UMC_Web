import {Outlet} from "react-router-dom"
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import ContentSection from "../components/pageContents";

const RootLayout = () => {
    return (
        <>
            <Sidebar/>
            <Navbar/>
            <ContentSection>
                <Outlet/>
            </ContentSection>
        </>
    );
}

export default RootLayout