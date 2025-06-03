import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '@/components/navbar.jsx';

const EditJobForm = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    // Initialize formData with default values to ensure controlled inputs
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary_range: '',
        is_remote: false,
        status: '',
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`/api/employer/jobs/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken') || sessionStorage.getItem('authToken')}`,
                    },
                });

                // Map API response to formData, providing fallback values
                const jobData = response.data.data;
                setFormData({
                    title: jobData.title || '',
                    description: jobData.description || '',
                    location: jobData.location || '',
                    salary_range: jobData.salary_range || '',
                    is_remote: jobData.is_remote ?? false, // Use nullish coalescing for boolean
                    status: jobData.status_id || '',
                });
            } catch (err) {
                toast.error('Failed to fetch job details');
                console.error(err);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            is_remote: e.target.checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/employer/jobs/${jobId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken') || sessionStorage.getItem('authToken')}`,
                },
            });
            toast.success('Job updated successfully');
            setTimeout(() => {
                navigate('/employer');
            }, 1000);
        } catch (err) {
            toast.error('Failed to update job. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-black mb-6">Edit Job Posting</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Job Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title || ''} // Fallback to empty string
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Description *</label>
                                    <textarea
                                        name="description"
                                        required
                                        value={formData.description || ''} // Fallback to empty string
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Location *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        required
                                        value={formData.location || ''} // Fallback to empty string
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Salary Range *</label>
                                    <input
                                        type="text"
                                        name="salary_range"
                                        required
                                        value={formData.salary_range || ''} // Fallback to empty string
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Status *</label>
                                    <select
                                        name="status"
                                        value={formData.status || ''} // Fallback to empty string
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="1">Pending Review</option>
                                        <option value="2">In Progress</option>
                                        <option value="3">Completed</option>
                                        <option value="4">Failed</option>
                                        <option value="5">Cancelled</option>
                                        <option value="6">Open for Applications</option>
                                        <option value="7">Applications Closed</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Remote Work</label>
                                    <input
                                        type="checkbox"
                                        name="is_remote"
                                        checked={formData.is_remote ?? false}
                                        onChange={handleCheckboxChange}
                                        className="h-5 w-5 text-cyan-950 focus:ring-cyan-950 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">This job is remote</span>
                                </div>
                                <div className="flex justify-end gap-4 mt-5">
                                    <Link
                                        to="/employer"
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-cyan-950 text-white rounded-lg hover:bg-cyan-800 transition-colors"
                                    >
                                        Update Job Posting
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

export default EditJobForm;
