import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import './index.css'
import UpTaskProvider from './context/UpTaskProvider'
import AuthProvider from './context/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UpTaskProvider>
        <RouterProvider  router={router} />
      </UpTaskProvider>
    </AuthProvider>
  </React.StrictMode>,
)
