import React, { useState } from 'react';

const Index = () => {
    return (
        <div>
            {/* Header Bar */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-cyan-800">Aplify</span>
                    </div>
                    {/* Navigation Links */}
                    <nav className="flex space-x-8">
                        <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">All Jobs</a>
                        <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Sign In</a>
                        <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Sign Up</a>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Index;
