import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';

import { swrConfig } from './config.ts';
import AppRouter from './app-router/AppRouter.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRConfig value={swrConfig}>
      <AppRouter />
    </SWRConfig>
  </StrictMode>,
);
