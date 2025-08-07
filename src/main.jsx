// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AnimalFeedingApp from './animal_feeding_app.jsx'; // animal_feeding_app.jsx をインポート
import './index.css'; // CSSファイルをインポート

// サービスワーカーの登録
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered: ', registration.scope);
      })
      .catch(err => {
        console.log('Service Worker registration failed: ', err);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimalFeedingApp />
  </React.StrictMode>
);
