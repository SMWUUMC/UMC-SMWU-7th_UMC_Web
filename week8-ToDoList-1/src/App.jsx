import './App.css'
import MainPage from './pages/MainPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DetailPage from './pages/DetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>
  },
  {
    path: '/detail/:id',
    element: <DetailPage/>
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App