import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChatProvider } from './containers/hooks/useChat';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
);