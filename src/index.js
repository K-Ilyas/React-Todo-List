import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/style.css';
import { Provider } from "react-redux"
import store from './store';



const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
