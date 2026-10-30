import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource/jetbrains-mono/400.css'
import './index.css'
import App from './App'
import { applyPreferences, readPreferences } from './lib/appearance'

applyPreferences(readPreferences())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
