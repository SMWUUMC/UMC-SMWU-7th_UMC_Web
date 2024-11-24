import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

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
            { path: '/', element: <HomePage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },
            { path: '/movies', element: <Movies /> },
            { path: '/movies/popular', element: <Moviepopular /> },
            { path: '/movies/nowplaying', element: <Movienowplaying /> },
            { path: '/movies/toprated', element: <Movietoprated /> },
            { path: '/movies/upcoming', element: <Moviepupcoming /> },
            { path: '/movie/:id', element: <MovieContents /> },
            { path: '/search', element: <SearchPage /> }
        ]
    }
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
