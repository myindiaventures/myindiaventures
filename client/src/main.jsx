import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN || `E1z9TPtER4ARK51pj5v1MyxrKisHY9oQ`}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || `Mu6p4bhY_u7Z48ithk4OQW7YV_0Prnm3T9d_BvMsZNdKJH7UNGQfWt52AlMOvcSY`}
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
