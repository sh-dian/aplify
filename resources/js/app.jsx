import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import MainPage from './pages/app.jsx';
import SignIn from './pages/sign-in.jsx';
import SignUp from './pages/sign-up.jsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
