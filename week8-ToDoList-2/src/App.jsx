import './App.css'
import MainPage from './pages/MainPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({ /* options */ });

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/detail/:id',
    element: <DetailPage />
  }
])

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App