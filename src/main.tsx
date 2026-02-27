import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SWRConfig } from 'swr'

import { swrConfig } from './config.ts'
import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRConfig value={swrConfig}>
      <App />
    </SWRConfig>
  </StrictMode>,
)
