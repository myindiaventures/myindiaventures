import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN || `dev-kqbbysra2z1ywlzm.us.auth0.com`}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || `ntEwsVH3F5Inp4rjqEDpNrAlzTtJVi21`}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <App />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </Auth0Provider>
);
