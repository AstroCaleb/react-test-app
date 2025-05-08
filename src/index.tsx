import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppWrapper } from './App.tsx';
import { AppProvider } from './AppProvider.tsx';
import './css/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <AppWrapper />
    </AppProvider>
  </React.StrictMode>,
);
