import React from 'react';
import {Link} from 'react-router-dom';
import {Briefcase} from "lucide-react";

const NavBar = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-cyan-950 rounded-lg flex items-center justify-center mr-2">
                        <Briefcase className="h-4 w-7 text-white"/>
                    </div>
                    <span className="text-xl font-bold text-cyan-900">
                          Aplify
                        </span>
                </div>
                {/* Navigation Links */}
                <nav className="flex space-x-8">
                    <Link to="/sign-in" className="text-slate-600 hover:text-blue-600 transition-colors">
                        Sign In
                    </Link>
                    <Link to="/sign-up" className="text-slate-600 hover:text-blue-600 transition-colors">
                        Sign Up
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
