import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AppRoutes } from './config/AppRoutes.tsx'
import { CssBaseline } from '@mui/material'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)
