import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        toastOptions={{
          style: {
            background: '#07130f',
            border: '1px solid rgba(0, 255, 157, 0.25)',
            color: '#f4fff9',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
