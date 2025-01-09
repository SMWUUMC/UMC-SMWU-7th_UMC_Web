import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToDoContextProvider } from './assets/context/ToDoContext.jsx'

createRoot(document.getElementById('root')).render(
  <ToDoContextProvider>
    <App />
  </ToDoContextProvider>
)
