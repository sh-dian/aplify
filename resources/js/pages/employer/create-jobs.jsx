import React, {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import NavBar from "@/components/navbar.jsx";

const JobForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary_range: '',
        is_remote: false,
        status: 6,
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
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
            await axios.post('/api/employer/jobs', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken') || sessionStorage.getItem('authToken')}`,
                },
            });
            toast.success('Job created successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            setTimeout(() => {
                navigate('/employer');
            }, 1000);
            setFormData({
                title: '',
                description: '',
                location: '',
                salary_range: '',
                is_remote: false,
                status: 6,
            });
        } catch (err) {
            toast.error('Failed to create job. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <NavBar/>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-black mb-6">Create a New Job Posting</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Job Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        placeholder="e.g., Junior Backend Developer"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Description *</label>
                                    <textarea
                                        name="description"
                                        required
                                        placeholder="Describe the job role and responsibilities..."
                                        value={formData.description}
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
                                        placeholder="e.g., New York, NY"
                                        value={formData.location}
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
                                        placeholder="e.g., $80,000 - $100,000"
                                        value={formData.salary_range}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium text-black mb-2">Remote Work</label>
                                    <input
                                        type="checkbox"
                                        name="is_remote"
                                        checked={formData.is_remote}
                                        onChange={handleCheckboxChange}
                                        className="h-5 w-5 text-cyan-950 focus:ring-cyan-950 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">This job is remote</span>
                                </div>
                                <input type="hidden" name="status" value={formData.status}/>
                                <div className="flex justify-end gap-4 mt-5">
                                    <Link
                                        to="/"
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-cyan-950 text-white rounded-lg hover:bg-cyan-800 transition-colors"
                                    >
                                        Submit Job Posting
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

export default JobForm;
