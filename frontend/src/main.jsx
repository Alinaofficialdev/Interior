import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

const seoTitle = 'Aura Luxury Interiors & Renovations Dubai | Turnkey Fit-Out & Joinery';
const seoDescription = 'Luxury interior design, renovation, joinery and fit-out services in Dubai. Explore bespoke villas, homes, penthouses, and commercial projects.';

const meta = document.createElement('meta');
meta.name = 'description';
meta.content = seoDescription;
document.head.appendChild(meta);

const titleTag = document.querySelector('title');
if (titleTag) {
  titleTag.textContent = seoTitle;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);