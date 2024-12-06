import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";

// 1. 만든 페이지들을 import
import HomePage from "./pages/Home/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";
import MovieCategory from "./pages/movie-category.jsx";
import MovieDetail from "./pages/MovieDetail/movie-detail.jsx";
import NowPlaying from "./pages/NowPlaying/now-playing.jsx";
import Popular from "./pages/Popular/popular.jsx";
import TopRated from "./pages/TopRated/top-rated.jsx";
import UpComing from "./pages/UpComing/up-coming.jsx";
import RootLayout from "./layout/root-layout.jsx";
import LogIn from "./pages/Login/log-in.jsx";
import SignUp from "./pages/SignUp/sign-up.jsx";
import Search from "./pages/Search/search.jsx";

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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
