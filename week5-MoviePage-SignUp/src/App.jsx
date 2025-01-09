import './App.css'
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import SearchPage from './pages/search'
import CategoryPage from './pages/category'
import NotFoundPage from './pages/notFound'
import RootLayout from './layouts/root-layout'
import NowPlaying from './pages/nowPlaying'
import Popular from './pages/popular'
import TopRated from './pages/topRated'
import UpComing from './pages/upComing'
import MovieLayout from './layouts/movie-layout'
import Details from './pages/details'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
        errorElement: <NotFoundPage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'signup',
        element: <SignupPage/>
      },
      {
        path: 'search',
        element: <SearchPage/>
      },
      {
        path: 'movies/',
        // element: <MovieLayout/>,
        children: [
          {
            index: true,
            element: <CategoryPage/>,
            errorElement: <NotFoundPage/>
          },
          {
            path: ':movieId',
            element: <Details/>
          },
          {
            path: 'now-playing',
            element: <NowPlaying/>
          },
          {
            path: 'popular',
            element: <Popular/>
          },
          {
            path: 'top-rated',
            element: <TopRated/>
          },
          {
            path: 'up-coming',
            element: <UpComing/>
          }
        ]
      }
    ]
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
