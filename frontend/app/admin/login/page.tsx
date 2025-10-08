'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth.store';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Ayda IVF</h1>
                    <p className="text-gray-600 mt-2">Admin Panel</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="admin@aydaivf.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/admin/register" className="text-blue-600 hover:text-blue-700 font-medium">
                            Register
                        </Link>
                    </p>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Demo Credentials:</p>
                        <div className="text-xs text-gray-600 space-y-1">
                            <p>Super Admin: admin@aydaivf.com / password123</p>
                            <p>Admin: editor@aydaivf.com / password123</p>
                            <p>Editor: content@aydaivf.com / password123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}