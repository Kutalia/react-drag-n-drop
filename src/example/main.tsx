import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DragNDropProvider } from '../lib'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DragNDropProvider>
      <App />
    </DragNDropProvider>
  </StrictMode>,
)
