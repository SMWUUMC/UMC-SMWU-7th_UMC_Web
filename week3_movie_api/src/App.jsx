import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Movies from "./pages/movies.jsx";
import RootLayout from "./layout/root-layout.jsx";
import Search from "./pages/search.jsx";
import NowPlaying from "./pages/now-playing.jsx";
import Popular from "./pages/popular.jsx";
import TopRated from "./pages/top-rated.jsx";
import UpComing from "./pages/up-coming.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'signup',
                element: <Signup/>
            },
            {
                path: 'search',
                element: <Search/>
            },
            {
                path: 'movies',
                element: <Movies/>
            },
            { 
                path: 'movies/now-playing',
                element: <NowPlaying/>
            },
            { 
                path: 'movies/popular',
                element: <Popular/>
            },
            { 
                path: 'movies/top-rated',
                element: <TopRated/>
            },
            { 
                path: 'movies/up-coming',
                element: <UpComing/>
            }

        ]
    },

])

function App() {
    return <RouterProvider router={router}/>
}

export default App