import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Broadcaster} from './components/broadcaster.jsx'

import App from './App.jsx'
import Capture from './pages/capture.jsx'
import Gender from './pages/gender.jsx'
import Clothes from './pages/clothes.jsx'
import Categories from './pages/categories.jsx'
import TryOn from './pages/tryon.jsx'
const Router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/capture',
    element:<Capture/>
  },
  {
    path: '/gender',
    element:<Gender/>
  },
  {
    path: '/clothes',
    element:<Clothes/>
  },
  {
    path: "/categories",
    element:<Categories/>
  },
  {
    path: "/tryon",
    element:<TryOn/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Broadcaster>
    <RouterProvider router={Router} />
    </Broadcaster>
  </StrictMode>,
)
