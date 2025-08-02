// Lokasi: resources/js/layouts/user-layout.tsx

import { Link, Head } from '@inertiajs/react';
import React from 'react';

// Definisikan tipe untuk user dan props yang diterima layout
type User = {
    name: string;
    email: string;
};

type UserLayoutProps = {
    user: User | null; // User bisa login (ada data) atau tidak (null)
    children: React.ReactNode;
};

export default function UserLayout({ user, children }: UserLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col" >
            <Head>
                <title>Prestige Auto Motor</title>
                <meta name="description" content="Premium Car Rental in Bali." />
            </Head>

            {/* Navbar */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold text-gray-800">
                        <Link href={route('home')}>Prestige Auto Motor</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            // Jika user sudah login
                            <>
                                <Link href={route('my-bookings')} className="text-gray-600 hover:text-blue-500">
                                    My Bookings
                                </Link>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-800 font-medium">Hi, {user.name}</span>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-gray-600 hover:text-blue-500"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            // Jika user adalah tamu
                            <>
                                <Link href={route('login')} className="text-gray-600 hover:text-blue-500">
                                    Login
                                </Link>
                                <Link href={route('register')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {/* Konten Utama Halaman */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; {new Date().getFullYear()} Prestige Auto Motor. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
