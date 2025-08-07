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
                <nav className="hidden space-x-8 md:flex">
                    <NavigationMenuDemo />
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

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function NavigationMenuDemo() {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
            
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/docs">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Cars</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="#">All Cars</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#">Sport</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#">Suv</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#">Sport</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#">Convertible</Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href={route('how-it-work')}>How It Work</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/docs">Contact</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
