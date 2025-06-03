import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar.jsx';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MapPin, Clock, DollarSign} from 'lucide-react';
import {Link} from 'react-router-dom';

const Index = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs?latest=true');
                setJobs(response.data.data);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch jobs');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

            {/* Navbar */}
            <NavBar/>
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-cyan-600/5"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
                            Find Your Next
                            <span className="block bg-gradient-to-r from-cyan-600 to-cyan-600 bg-clip-text text-transparent font-medium">
                                Dream Job
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Discover opportunities at the world's most innovative companies.
                            Your perfect role is waiting.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16">
                            <div className="text-center">
                                <div className="text-3xl font-light text-slate-900 mb-1">1,247</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wide">Active Jobs</div>
                            </div>
                            <div className="text-center border-x border-slate-200">
                                <div className="text-3xl font-light text-slate-900 mb-1">350+</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wide">Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-light text-slate-900 mb-1">95%</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wide">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-7xl md:text-5xl font-light text-slate-900 mb-7 tracking-tight">
                        Latest
                        <span className="ml-4 bg-gradient-to-r from-cyan-600 to-cyan-600 bg-clip-text text-transparent font-medium">
                            Jobs Openings
                        </span>
                    </h1>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-black mb-1">{job.title}</h3>
                                                        <p className="text-gray-600">{job.employer?.name}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-1"/>
                                                        {job.location}
                                                        {job.is_remote && <span className="ml-1 text-green-600">(Remote Available)</span>}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <DollarSign className="h-4 w-4 mr-1"/>
                                                        {job.salary_range}
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 mb-4">{job.description}</p>
                                            </div>

                                            <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col gap-2">
                                                <Link
                                                    to={`/apply-job/${job.id}`}
                                                    className="bg-cyan-950 text-white px-6 py-3 rounded-lg hover:bg-cyan-800 transition-colors text-center">
                                                    Apply Job
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;
