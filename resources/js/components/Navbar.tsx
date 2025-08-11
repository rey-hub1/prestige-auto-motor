// Lokasi: resources/js/components/Navbar.tsx

import { Link } from '@inertiajs/react';

// Definisikan tipe User yang diterima oleh Navbar
type User = {
    name: string;
    email: string;
};

type NavbarProps = {
    user: User | null;
};

export default function Navbar({ user }: NavbarProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-300 bg-white px-6 py-4">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                {/* Logo */}
                <Link href={route('home')}>
                    <img src="/images/global/logo.png" width="120" alt="Prestige Auto Motor Logo" />
                </Link>

                {/* Navigation */}
                <nav className="flex space-x-8">
                    <Example />
                </nav>

                {/* Auth Links */}
                <div className="hidden items-center space-x-4 md:flex">
                    {user ? (
                        // Jika user sudah login
                        <>
                            <Link href={route('my-bookings')} className="text-gray-600 hover:text-blue-500">
                                My Bookings
                            </Link>
                            <span className="text-gray-400">|</span>
                            <span className="font-medium text-gray-800">Hi, {user.name}</span>
                            <Link href={route('logout')} method="post" as="button" className="text-gray-600 hover:text-blue-500">
                                Logout
                            </Link>
                        </>
                    ) : (
                        // Jika user adalah tamu
                        <>
                            <Link href={route('login')} className="text-gray-600 hover:text-blue-500">
                                Login
                            </Link>
                            <Link href={route('register')} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

('use client');

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

function Example() {
    return (
        <div className="flex gap-8">
            <div className="text-sm/6 font-semibold text-foreground">Products</div>
            <Link href={route('home')}>Home</Link>
            <Popover className="group">
                {({ open }) => (
                    <>
                        <PopoverButton className="flex items-center gap-2">
                            Solutions
                            <ChevronDown className={clsx('size-5', open && 'rotate-180')} />
                        </PopoverButton>
                        <PopoverPanel anchor="bottom" className="flex flex-col">
                            <a href="/insights">Insights</a>
                            <a href="/automations">Automations</a>
                            <a href="/reports">Reports</a>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
            <div className="text-sm/6 font-semibold">Pricing</div>
        </div>
    );
}
