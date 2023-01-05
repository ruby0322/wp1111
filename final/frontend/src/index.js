import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/AuthContext';
import { FetchProvider } from './hooks/FetchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FetchProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FetchProvider>
  </React.StrictMode>
);
