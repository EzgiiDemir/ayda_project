'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth.store';
import Link from 'next/link';
import {
    LayoutDashboard,
    FileText,
    Component as ComponentIcon,
    Image,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
} from 'lucide-react';

export default function MediaLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/admin/login');
        }
    }, [isLoading, isAuthenticated, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Pages', href: '/admin/pages', icon: FileText },
        { name: 'Components', href: '/admin/components', icon: ComponentIcon },
        { name: 'Media Library', href: '/admin/media', icon: Image },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar - Desktop */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-gray-900 text-white transition-all duration-300 ${
                    sidebarOpen ? 'w-64' : 'w-20'
                } hidden md:block`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
                        {sidebarOpen ? (
                            <>
                                <h1 className="text-xl font-bold">Ayda IVF</h1>
                                <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-gray-800 rounded">
                                    <X size={20} />
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setSidebarOpen(true)} className="p-1 hover:bg-gray-800 rounded mx-auto">
                                <Menu size={20} />
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                    title={!sidebarOpen ? item.name : ''}
                                >
                                    <item.icon size={20} />
                                    {sidebarOpen && <span>{item.name}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info */}
                    <div className="border-t border-gray-800 p-4">
                        <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                            {sidebarOpen && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-400 capitalize">{user?.role.replace('_', ' ')}</p>
                                </div>
                            )}
                        </div>
                        {sidebarOpen && (
                            <button
                                onClick={handleLogout}
                                className="mt-3 w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {mobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white md:hidden">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
                                <h1 className="text-xl font-bold">Ayda IVF</h1>
                                <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                                    <X size={20} />
                                </button>
                            </div>
                            <nav className="flex-1 px-2 py-4 space-y-1">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                                isActive
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                            }`}
                                        >
                                            <item.icon size={20} />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>
                </>
            )}

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex-1" />
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 hidden sm:block">Welcome, {user?.name}</span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}