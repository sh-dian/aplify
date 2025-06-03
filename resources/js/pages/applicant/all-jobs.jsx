import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NavBar from "@/components/navbar.jsx";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MapPin, DollarSign} from 'lucide-react';
import {Link} from 'react-router-dom';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/jobs', {
                    params: {
                        search: search || undefined,
                        page: currentPage,
                    },
                });
                setJobs(response.data.data);
                setTotalPages(Math.ceil(response.data.total / response.data.per_page));
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch jobs');
                setLoading(false);
            }
        };

        fetchJobs();
    }, [search, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const Pagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 mx-1 rounded ${
                        currentPage === i
                            ? 'bg-cyan-950 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return (
            <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                {pages}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <NavBar/>
            <ToastContainer position="top-right" autoClose={3000}/>

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
                        <h1 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
                            All
                            <span className="ml-4 bg-gradient-to-r from-cyan-600 to-cyan-600 bg-clip-text text-transparent font-medium">
                                Jobs Openings
                            </span>
                        </h1>

                        {/* Search Bar */}
                        <div className="w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search jobs by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-cyan-600"
                            />
                        </div>
                    </div>


                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-6">
                                {jobs.length > 0 ? (
                                    jobs.map((job) => (
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
                                                                {job.is_remote && (
                                                                    <span className="ml-1 text-green-600">(Remote Available)</span>
                                                                )}
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
                                                            className="bg-cyan-950 text-white px-6 py-3 rounded-lg hover:bg-cyan-800 transition-colors text-center"
                                                        >
                                                            Apply Job
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">No jobs found.</p>
                                )}
                            </div>
                            {jobs.length > 0 && <Pagination/>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllJobs;
