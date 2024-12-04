import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";

// 1. 만든 페이지들을 import
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";
import MovieCategory from "./pages/movie-category.jsx";
import NowPlaying from "./pages/now-playing.jsx";
import Popular from "./pages/popular.jsx";
import TopRated from "./pages/top-rated.jsx";
import UpComing from "./pages/up-coming.jsx";
import RootLayout from "./layout/root-layout.jsx";
import MovieDetail from "./pages/movie-detail.jsx";
import LogIn from "./pages/log-in.jsx";
import SignUp from "./pages/sign-up.jsx";
import Search from "./pages/Search/search.jsx";

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'yg-jalnan';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Freesentation-9Black';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-9Black.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
  }

  body {
    font-family: 'Freesentation-9Black';
    margin: 0;
    // height: 100vh;
    // width: 100vw;
    background-color: black;
    color: white;
  }
`;

//2. 연결
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    // navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
    children: [
      { index: true, element: <HomePage /> }, // index: true는 위의 path: "/", 즉 홈 경로를 의미한다
      { path: "movies", element: <MovieCategory /> },
      {
        path: "movies/:movieId", // 부모의 path가 "/"이니 /를 붙이지 않아도 ㄱㅊ
        element: <MovieDetail />,
      },
      { path: "movies/now-playing", element: <NowPlaying /> },
      { path: "movies/popular", element: <Popular /> },
      { path: "movies/top-rated", element: <TopRated /> },
      { path: "movies/up-coming", element: <UpComing /> },

      { path: "login", element: <LogIn /> },
      { path: "/auth/register", element: <SignUp /> },
      { path: "search", element: <Search /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
