// Lokasi: resources/js/Pages/Welcome.tsx

import UserLayout from '@/layouts/user-layout';
import { Head, Link } from '@inertiajs/react';

// Definisikan tipe untuk objek Car
interface Car {
    id: number;
    brand: string;
    model: string;
    category: string;
    price_per_day: number;
    seating_capacity: number;
    transmission: string;
}

// Definisikan tipe untuk props yang diterima halaman Welcome
// `cars` adalah props yang kita kirim dari HomeController
interface WelcomeProps {
    auth: any;
    cars: Car[];
}

const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

function CarCard({ car }: { car: Car }) {
    // Komponen CarCard tidak berubah
    return (
        <Link href={route('car.show', car.id)} className="block transition-transform duration-300 hover:scale-105">
            <div className="h-full rounded-lg border bg-white p-4 shadow-lg">
                {/* ... (sisa isi kartu tidak ada yang berubah) */}
                <div className="mb-4 flex h-40 w-full items-center justify-center rounded-md bg-gray-200">
                    <span className="text-gray-500">Gambar Mobil</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                    {car.brand} {car.model}
                </h3>
                <p className="mb-2 text-sm text-gray-500">{car.category}</p>
                <div className="mb-4 flex items-center space-x-4 text-xs text-gray-600">
                    <span>{car.seating_capacity} People</span>
                    <span>•</span>
                    <span>{car.transmission}</span>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-md font-extrabold text-gray-900">
                        {formatRupiah(car.price_per_day)} <span className="text-sm font-normal">/ hari</span>
                    </p>
                    <span className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Rent Now</span>
                </div>
            </div>
        </Link>
    );
}

// Terima `cars` sebagai props, langsung dari Laravel!
export default function Welcome({ auth, cars }: WelcomeProps) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen">
                <section className="relative px-6 py-16">
                    <div className="mx-auto flex max-w-6xl items-center">
                        <div className="flex-1">
                            <h1 className='text-4xl'><span className='text-primary'>No.1 </span>Premium Car Rental In Bali</h1>
                            <p>Wujudkan pengalaman berkendara terbaikmu di Bali dengan mobil premium pilihan kami.</p>
                        </div>

                        {/* Car Image Placeholder */}
                        <div className="flex flex-2 justify-end">
                            <div className="h-48 w-96 rounded-lg bg-gray-300"></div>
                        </div>
                    </div>
                </section>

                {/* Brand Logos */}
                <section className="bg-white px-6 py-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex justify-center space-x-12">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="h-12 w-12 rounded-full bg-gray-300"></div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Browse by Type */}
                <section className="bg-gray-50 px-6 py-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 flex items-center justify-between">
                            <div className="h-6 w-32 rounded bg-gray-800"></div>
                            <div className="h-4 w-16 rounded bg-blue-500"></div>
                        </div>

                        <div className="grid grid-cols-5 gap-6">
                            {['Sport', 'Convertible', 'Hatchback', 'SUV', 'Sedan'].map((type, i) => (
                                <div key={i} className="rounded-lg border bg-white p-4">
                                    <div className="mb-4 h-32 w-full rounded bg-gray-300"></div>
                                    <div className="mb-1 h-4 w-8 rounded bg-gray-600"></div>
                                    <div className="h-3 w-16 rounded bg-gray-400"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trend Vehicle */}
                <section className="bg-white px-6 py-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 h-6 w-32 rounded bg-gray-800"></div>

                        <div className="grid grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="rounded-lg border border-gray-200 bg-white p-6">
                                    <div className="mb-1 h-4 w-24 rounded bg-gray-600"></div>
                                    <div className="mb-6 h-3 w-12 rounded bg-gray-400"></div>

                                    <div className="mb-6 h-32 w-full rounded bg-gray-300"></div>

                                    <div className="mb-4 flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                                                <div className="h-3 w-6 rounded bg-gray-400"></div>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                                                <div className="h-3 w-12 rounded bg-gray-400"></div>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                                                <div className="h-3 w-12 rounded bg-gray-400"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="h-6 w-20 rounded bg-gray-600"></div>
                                        <div className="h-8 w-16 rounded bg-blue-500"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 px-6 py-12 text-white">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-4 gap-8">
                            {/* Company Info */}
                            <div>
                                <div className="mb-4 h-8 w-32 rounded bg-gray-600"></div>
                                <div className="h-12 w-48 rounded bg-gray-600"></div>
                            </div>

                            {/* About */}
                            <div>
                                <div className="mb-4 h-5 w-16 rounded bg-gray-500"></div>
                                <div className="space-y-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-4 w-24 rounded bg-gray-600"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Community */}
                            <div>
                                <div className="mb-4 h-5 w-20 rounded bg-gray-500"></div>
                                <div className="space-y-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-4 w-28 rounded bg-gray-600"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Social */}
                            <div>
                                <div className="mb-4 h-5 w-16 rounded bg-gray-500"></div>
                                <div className="space-y-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-4 w-20 rounded bg-gray-600"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-white p-4 shadow-md">
                    <h1 className="text-center text-2xl font-bold">Prestige Auto Motor</h1>
                </header>

                <main className="container mx-auto p-8">
                    <h2 className="mb-6 text-3xl font-bold text-gray-800">Trend Vehicle</h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Langsung map dari props, tidak perlu state */}
                        {cars.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

Welcome.layout = (page: React.ReactElement<WelcomeProps>) => <UserLayout user={page.props.auth.user} children={page} />;
