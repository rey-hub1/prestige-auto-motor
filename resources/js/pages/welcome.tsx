// Lokasi: resources/js/Pages/Welcome.tsx

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
               <Link href={route('car.show', car.id)} className="block hover:scale-105 transition-transform duration-300">
            <div className="border rounded-lg p-4 shadow-lg bg-white h-full">
                {/* ... (sisa isi kartu tidak ada yang berubah) */}
                <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Gambar Mobil</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">{car.brand} {car.model}</h3>
                <p className="text-sm text-gray-500 mb-2">{car.category}</p>
                <div className="flex items-center text-xs text-gray-600 space-x-4 mb-4">
                    <span>{car.seating_capacity} People</span>
                    <span>•</span>
                    <span>{car.transmission}</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-md font-extrabold text-gray-900">
                        {formatRupiah(car.price_per_day)} <span className="font-normal text-sm">/ hari</span>
                    </p>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Rent Now
                    </span>
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
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-white shadow-md p-4">
                    <h1 className="text-2xl font-bold text-center">Prestige Auto Motor</h1>
                </header>

                <main className="container mx-auto p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Trend Vehicle</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Langsung map dari props, tidak perlu state */}
                        {cars.map(car => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
