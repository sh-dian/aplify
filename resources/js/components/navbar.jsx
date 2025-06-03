import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase } from "lucide-react";
import axios from 'axios';

const NavBar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
        setIsAuth(!!token);
        setRole(user?.role || null);
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            await axios.post(
                `${import.meta.env.VITE_API_URL}/logout`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            // Optionally handle error
        } finally {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('user');
            setIsAuth(false);
            setRole(null);
            navigate('/sign-in');
        }
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-cyan-950 rounded-lg flex items-center justify-center mr-2">
                        <Briefcase className="h-4 w-7 text-white"/>
                    </div>
                    <span className="text-xl font-bold text-cyan-900">
                        Aplify
                    </span>
                </div>
                <nav className="flex space-x-8">
                    {isAuth ? (
                        <>
                            {role === 'Applicant' && (
                                <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">
                                    Home
                                </Link>
                            )}
                            {/* Add more role-based links as needed */}
                            <button
                                onClick={handleLogout}
                                className="text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/sign-in" className="text-slate-600 hover:text-blue-600 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/sign-up" className="text-slate-600 hover:text-blue-600 transition-colors">
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
