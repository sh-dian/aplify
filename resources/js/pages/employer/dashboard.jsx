import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '@/components/navbar.jsx';
import axios from 'axios';
import {Edit, Briefcase, MapPin, DollarSign, Calendar, Eye, Trash2} from 'lucide-react';
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newJob, setNewJob] = useState({title: '', description: '', company: '', location: '', salary: '', type: ''});
    const [searchTerm, setSearchTerm] = useState('');

    // Derived state for filtered jobs
    const filteredJobs = jobs.filter(
        (job) =>
            job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    Authorization: `Bearer ${token}`,
                },
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

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await axios.delete(`/api/employer/jobs/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken') || sessionStorage.getItem('authToken')}`,
                    },
                });
                toast.success('Job deleted successfully');
                fetchJobs();
            } catch (err) {
                toast.error('Failed to delete job');
            }
        }
    };

    // Utility function for status color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    // Utility function to format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <NavBar/>
            <ToastContainer/>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-purple-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Job Management Dashboard
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Streamline your hiring process with our modern job management platform.
                            Create, edit, and track job postings with ease.
                        </p>
                        <Link
                            to={`/employer/create-job`}
                            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-cyan-100 transition-colors">
                            Create New Job
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Jobs Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-slate-600">Loading amazing opportunities...</p>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-12 border-0 shadow-sm bg-white rounded-lg">
                        <div className="px-6 py-4">
                            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white hover:scale-[1.02] cursor-pointer rounded-lg">
                                <div className="px-6 py-4 pb-3">
                                    <div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                {job.title}
                                            </h3>
                                            <p className="text-sm font-medium text-gray-600 mt-1">{job.company}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 pt-0 pb-4">
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="h-4 w-4 mr-2 text-gray-400"/>
                                            {job.location}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <DollarSign className="h-4 w-4 mr-2 text-gray-400"/>
                                            {job.salary_range}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="h-4 w-4 mr-2 text-gray-400"/>
                                            Posted {formatDate(job.created_at)}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <span className={`${getStatusColor(job.status)} border px-2 py-1 rounded-md text-xs`}>
                                          {job.status}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                to={`/employer/edit-job/${job.id}`}
                                                className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-full flex items-center justify-center">
                                                <Edit className="h-4 w-4"/>
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(job.id);
                                                }}
                                                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center"
                                            >
                                                <Trash2 className="h-4 w-4"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
