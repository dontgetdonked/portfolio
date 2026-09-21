import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/sofia-sans/wght.css'
import '@fontsource-variable/sofia-sans-condensed/wght.css'
import '@fontsource-variable/sofia-sans-extra-condensed/wght.css'
import App from '@/App'
import '@/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
