import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom' 
import { inject } from "@vercel/analytics";
import { SpeedInsights } from '@vercel/analytics/react';

inject();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SpeedInsights /> 
    <App />
  </BrowserRouter>
)
