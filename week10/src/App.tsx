import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/home';
import NotFound from './pages/not-found';
import Movies from './pages/movies';
import RootLayout from './layout/root-layout';
import LoginPage from './pages/logIn';
import SignupPage from './pages/signUp';
import SearchPage from './pages/searchUp';
import MoviePopular from './pages/popular';
import MovieNowPlaying from './pages/now-playing';
import MovieTopRated from './pages/top-rated';
import MovieUpcoming from './pages/up-coming';
import MovieContents from './pages/movie-contents';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
        { index: true, element: <HomePage /> },
        { path: 'movies', element: <Movies /> },
        { path: 'movies/now-playing', element: <MovieNowPlaying /> },
        { path: 'movies/popular', element: <MoviePopular /> },
        { path: 'movies/top-rated', element: <MovieTopRated /> },
        { path: 'movies/up-coming', element: <MovieUpcoming /> },
        { path: 'movies/:movieId', element: <MovieContents /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'signup', element: <SignupPage /> },
        { path: 'search', element: <SearchPage /> },
        ],
    },
]);

function App(): JSX.Element {
    return (
        <AuthProvider>
        <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
