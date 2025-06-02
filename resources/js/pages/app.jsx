import React, {useState} from 'react';
import NavBar from '../components/navbar.jsx';
const Index = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

            {/* Navbar */}
            <NavBar />

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
        </div>
    );
};

export default Index;
