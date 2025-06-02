import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import MainPage from './pages/app.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <MainPage />
    </React.StrictMode>
);
