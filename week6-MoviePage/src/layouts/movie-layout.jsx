import {Outlet} from "react-router-dom"
import ContentSection from "../components/pageContents";

const MovieLayout = () => {
    return (
        <>
            <Outlet/>
        </>
    );
}

export default MovieLayout