import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/style.css';



const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
