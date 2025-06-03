import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "@/components/navbar.jsx";
import axios from 'axios';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newJob, setNewJob] = useState({title: '', description: ''});

    // Fetch jobs on component mount
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            if (!token) {
                throw new Error('No authentication token available');
            }
            const response = await axios.get('/api/employer/jobs', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Ensure we're setting an array
            setJobs(Array.isArray(response.data) ? response.data : response.data.data || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch jobs');
            toast.error('Failed to fetch jobs');
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/employer/jobs', newJob);
            toast.success('Job created successfully');
            setNewJob({title: '', description: ''});
            fetchJobs();
        } catch (err) {
            toast.error('Failed to create job');
        }
    };

    const handleEdit = async (job, updatedJob) => {
        try {
            await axios.put(`/api/employer/jobs/${job}`, updatedJob);
            toast.success('Job updated successfully');
            fetchJobs();
        } catch (err) {
            toast.error('Failed to update job');
        }
    };

    const handleDelete = async (job) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await axios.delete(`/api/employer/jobs/${job}`);
                toast.success('Job deleted successfully');
                fetchJobs();
            } catch (err) {
                toast.error('Failed to delete job');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <NavBar/>
            <ToastContainer position="top-right" autoClose={3000}/>

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0"></div>
                <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    {/* Jobs Table */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {loading ? (
                            <p className="text-center p-6 text-slate-600">Loading...</p>
                        ) : error ? (
                            <p className="text-center p-6 text-red-600">{error}</p>
                        ) : jobs.length === 0 ? (
                            <p className="text-center p-6 text-slate-600">No jobs found.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {jobs.map((job) => (
                                        <tr key={job.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{job.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => {
                                                        const updatedTitle = prompt('Enter new title:', job.title);
                                                        const updatedDesc = prompt('Enter new description:', job.description);
                                                        if (updatedTitle && updatedDesc) {
                                                            handleEdit(job.id, {title: updatedTitle, description: updatedDesc});
                                                        }
                                                    }}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(job.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
