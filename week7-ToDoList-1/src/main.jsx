import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToDoContextProvider } from './context/ToDoContext.jsx'

createRoot(document.getElementById('root')).render(
  <ToDoContextProvider>
    <App />
  </ToDoContextProvider>,
)
