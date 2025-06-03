import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                email: formData.email,
                password: formData.password
            });

            if (response.data.is_success) {
                const storage = formData.remember ? localStorage : sessionStorage;
                storage.setItem('authToken', response.data.data.token);
                storage.setItem('user', JSON.stringify(response.data.data.user));

                toast.success('Login successful! Redirecting...');
                setTimeout(() => navigate('/'), 1000);
            }
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-6">
                        <div className="w-12 h-12 bg-cyan-950 rounded-lg flex items-center justify-center">
                            <Briefcase className="h-7 w-7 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-cyan-950">
                          JobBoard
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-cyan-700 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                />
                                {/*<span className="ml-2 text-sm text-gray-700">Remember me</span>*/}
                            </label>
                            {/*<Link to="/forgot-password" className="text-sm text-black hover:text-gray-700">*/}
                            {/*    Forgot password?*/}
                            {/*</Link>*/}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-cyan-950 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/sign-up" className="text-black hover:text-gray-700 font-semibold">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
