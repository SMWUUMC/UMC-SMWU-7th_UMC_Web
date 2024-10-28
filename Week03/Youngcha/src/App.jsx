import './App.css'
import styled from 'styled-components';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 페이지들을 import
import HomePage from './pages/home';
import NotFound from './pages/not-found';
import Movies from './pages/movies';

// 루트 레이아웃
import RootLayout from './layout/root-layout';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import SearchPage from './pages/search';
import NowPlaying from './pages/now-playing';
import TopRated from './pages/top-rated';
import Popular from './pages/popular';
import UpComing from './pages/up-coming';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <HomePage />,
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
      },
      {
        path: 'movies/now-playing',
        element: <NowPlaying />
      },
      {
        path: 'movies/popular',
        element: <Popular />
      },
      {
        path: 'movies/top-rated',
        element: <TopRated />
      },
      {
        path: 'movies/up-coming',
        element: <UpComing />
      },
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App