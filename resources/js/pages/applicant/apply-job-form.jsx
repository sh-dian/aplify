import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Briefcase, Plus, X, MapPin, DollarSign, Clock, Building } from 'lucide-react';
import NavBar from "@/components/navbar.jsx";
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure Axios to send credentials
axios.defaults.withCredentials = true;

const ApplyJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [formData, setFormData] = useState({
        message: '',
        resume: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchAuthUser = async () => {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            if (!token) {
                setAuthLoading(false);
                return;
            }
            try {
                const response = await axios.get('/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAuthUser(response.data);
            } catch (error) {
                console.error('Error fetching auth user:', error.response?.status, error.response?.data, error.message);
            } finally {
                setAuthLoading(false);
            }
        };

        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
                if (!token) {
                    throw new Error('No authentication token available');
                }
                const response = await axios.get(`/api/jobs/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setJob(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job details:', error.response?.data || error.message);
                toast.error('Failed to fetch job details');
                setLoading(false);
            }
        };

        fetchAuthUser();
        fetchJobDetails();
    }, [jobId]);

    // Redirect to login if not authenticated
    if (!loading && !authLoading && !authUser) {
        return (
            <div className="min-h-screen bg-white">
                <NavBar />
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">Please Login to Apply</h2>
                        <Link
                            to="/sign-in"
                            className="px-6 py-3 bg-cyan-950 text-white rounded-lg hover:bg-cyan-800 transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('message', formData.message);
            if (formData.resume) {
                formDataToSend.append('resume', formData.resume);
            }

            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            if (!token) {
                throw new Error('No authentication token available');
            }

            await axios.post(`/api/applicant/apply-job/${jobId}`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Application submitted successfully!', {
                autoClose: 2000,
            });

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error submitting application:', error.response?.data || error.message);
            toast.error('Failed to submit application');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-white">
                <NavBar />
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <ToastContainer/>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Job Details Card */}
                    {job && (
                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-8">
                            <h1 className="text-3xl font-bold text-black mb-4">{job.title}</h1>
                            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Building className="h-4 w-4 mr-1" />
                                    {job.employer?.name}
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {job.location}
                                    {job.is_remote && <span className="ml-1 text-green-600">(Remote Available)</span>}
                                </div>
                                <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    {job.salary_range}
                                </div>
                            </div>
                            <div className="prose max-w-none">
                                <h3 className="text-xl font-semibold mb-2">Description</h3>
                                <p className="mb-4">{job.description}</p>
                            </div>
                        </div>
                    )}

                    {/* Application Form */}
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-black mb-6">Tell Us Why Should We Choose You</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Message *</label>
                                    <textarea
                                        name="message"
                                        required
                                        placeholder="Write your message here..."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Upload Resume *</label>
                                    <input
                                        type="file"
                                        name="resume"
                                        accept=".pdf,.doc,.docx"
                                        required
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                    />
                                </div>

                                <div className="flex justify-end gap-4 mt-5">
                                    <Link
                                        to="/"
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 bg-cyan-950 text-white rounded-lg hover:bg-cyan-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            'Submit Application'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;
