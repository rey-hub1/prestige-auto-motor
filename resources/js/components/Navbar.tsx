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
                    <NavigationMenuTrigger>List</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="#">
                                        <div className="font-medium">Components</div>
                                        <div className="text-muted-foreground">Browse all components in the library.</div>
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#">
                                        <div className="font-medium">Documentation</div>
                                        <div className="text-muted-foreground">Learn how to use the library.</div>
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#">
                                        <div className="font-medium">Blog</div>
                                        <div className="text-muted-foreground">Read our latest blog posts.</div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="#">Components</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#">Documentation</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#">Blocks</Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
