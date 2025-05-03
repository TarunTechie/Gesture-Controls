import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Broadcaster} from './components/broadcaster.jsx'

import App from './App.jsx'
import TryOn from './pages/tryon.jsx'
import Gender from './pages/gender.jsx'
import Clothes from './pages/clothes.jsx'
import Categories from './pages/categories.jsx'
import GestureDetect from './components/gesturesDetect.jsx'
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
  },
  {
    path: '/clothes',
    element:<Clothes/>
  },
  {
    path: "/categories",
    element:<Categories/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Broadcaster>
    <RouterProvider router={Router} />
    </Broadcaster>
  </StrictMode>,
)
