import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";
import RootLayout from "./layout/root-layout.jsx";
import LoginPage from "./pages/logIn.jsx";
import SignupPage from "./pages/signUp.jsx";
import SearchPage from "./pages/searchUp.jsx";
import Moviepopular from "./pages/popular.jsx";
import Movienowplaying from "./pages/now-playing.jsx";
import Movietoprated from "./pages/top-rated.jsx";
import Moviepupcoming from "./pages/up-coming.jsx";
import MovieContents from "./pages/movie-contents.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'movies',
                element: <Movies />
            },
            {
                path: 'movies/now-playing',
                element: <Movienowplaying /> // `NowPlaying` 페이지로 이동
            },
            {
                path: 'movies/popular',
                element: <Moviepopular /> // `Popular` 페이지로 이동
            },
            {
                path: 'movies/top-rated',
                element: <Movietoprated /> // `TopRated` 페이지로 이동
            },
            {
                path: 'movies/up-coming',
                element: <Moviepupcoming /> // `UpComing` 페이지로 이동
            },
            {
                path:'movies/:movieId',
                element: <MovieContents />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'signup',
                element: <SignupPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            }
        ]
    }
]);


function App() {
    return <RouterProvider router={router}/>
}

export default App