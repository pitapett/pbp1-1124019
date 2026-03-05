import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { CssBaseline } from '@mui/material'
import MenuListPage from './pages/MenuListPage/MenuListPage.tsx'
import MenuDetailsPage from './pages/MenuDetailsPage/MenuDetailsPage.tsx'
import CreateMenuPage from './pages/CreateMenuPage.tsx'
import UpdateMenuPage from './pages/UpdateMenuPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuListPage />,
    errorElement: <div>404 Not Found <br /> </div>
  },
  {
    path: '/menu/:id',
    element: <MenuDetailsPage />
  },
  {
    path: '/create-menu',
    element: <CreateMenuPage />
  },
  {
    path: '/menu-update/:id',
    element: <UpdateMenuPage />
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
