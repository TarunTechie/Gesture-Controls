import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TryOn from './pages/tryon.jsx'
import Gender from './pages/gender.jsx'
const Router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/camera',
    element:<TryOn/>
  },
  {
    path: '/gender',
    element:<Gender/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)
