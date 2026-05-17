import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { Footer } from './footer';
import { Navigation } from './navigation';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Navigation />
        <App />
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
