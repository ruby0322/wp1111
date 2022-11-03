import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Containers/App';
import { ScoreCardProvider } from './hooks/useScoreCard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ScoreCardProvider>
      <App />
    </ScoreCardProvider>
  </React.StrictMode>
);