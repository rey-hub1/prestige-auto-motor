// Lokasi: resources/js/layouts/admin-layout.tsx

import { Link, Head } from '@inertiajs/react';
import React from 'react';

type User = {
    name: string;
};

type AdminLayoutProps = {
    user: User;
    header: string; // Header untuk judul halaman
    children: React.ReactNode;
};

export default function AdminLayout({ user, header, children }: AdminLayoutProps) {
    return (
        <>
            <Head title={header} />
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-6">
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold">Admin Panell</h2>
                        <p className="text-sm text-gray-400">Prestige Auto Motor &#128521;</p>
                    </div>
                    <nav className="space-y-4">
                         <Link
                            href={route('home')}
                            className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-700"
                        >
                            <span>Home</span>
                        </Link>
                        <Link
                            href={route('admin.dashboard')}
                            className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-700"
                        >
                            <span>Dashboard (Bookings)</span>
                        </Link>
                        <Link
                            href={route('admin.cars.index')}
                            className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-700"
                        >
                            <span>Manajemen Mobil</span>
                        </Link>



                        {/* Tambahkan link admin lain di sini nanti */}
                    </nav>
                    <div className="absolute bottom-6">
                        <p className="text-sm font-medium">Hi, {user.name}</p>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-gray-400 hover:text-white"
                        >
                            Logout
                        </Link>
                    </div>
                </aside>

                {/* Konten Utama */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
