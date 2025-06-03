import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import MainPage from './pages/app.jsx';
import SignIn from './pages/sign-in.jsx';
import SignUp from './pages/sign-up.jsx';
import Dashboard from './pages/employer/dashboard.jsx';
import JobForm from './pages/employer/create-jobs.jsx';
import EditJobForm from './pages/employer/edit-jobs.jsx';

import ApplyJobForm from './pages/applicant/apply-job-form.jsx';
import AllJobs from './pages/applicant/all-jobs.jsx';

import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                {/*Employer routes*/}
                <Route path="/employer" element={<Dashboard />} />
                <Route path="/employer/create-job" element={<JobForm />} />
                <Route path="/employer/edit-job/:jobId" element={<EditJobForm />} />

                {/*Applicant routes*/}
                <Route path="/" element={<MainPage />} />
                <Route path="/all-jobs" element={<AllJobs />} />
                <Route path="/apply-job/:jobId" element={<ApplyJobForm />} />

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
