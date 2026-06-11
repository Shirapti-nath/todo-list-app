import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const isExtension =
  typeof chrome !== 'undefined' && Boolean(chrome.runtime?.id);

if (isExtension) {
  document.documentElement.classList.add('extension-popup');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
