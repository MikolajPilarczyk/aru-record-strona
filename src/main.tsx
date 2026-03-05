import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Footer } from './footer';
import { Navigation } from './navigation';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    {/* BrowserRouter musi być najwyżej, aby cała aplikacja mogła korzystać z routingu */}
    <BrowserRouter>
      <Navigation />
      <App />
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);