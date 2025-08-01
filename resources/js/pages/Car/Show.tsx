
import { Head, Link } from '@inertiajs/react';

// Definisikan tipe Car yang lebih lengkap sesuai database
interface Car {
    id: number;
    brand: string;
    model: string;
    category: string;
    year: number;
    price_per_day: number;
    color: string;
    transmission: string;
    fuel_type: string;
    seating_capacity: number;
    engine_specification: string;
    features: string[]; // Ini adalah array dari string
    image_url: string | null;
}

interface User {
    id:number ;
    name : string;
    email : string;
}

interface ShowProps {
    auth: {
        user: User | null;
    };
    car:Car ;
}

const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

export default function Show({ auth, car }: ShowProps) {
     const featuresArray = Array.isArray(car.features)
        ? car.features
        : JSON.parse(car.features);
    console.log(featuresArray)
    return (
        <>
            <Head title={`${car.brand} ${car.model}`} />
            <div className="bg-gray-100 min-h-screen">
                <main className="container mx-auto p-4 md:p-8">
                    {/* Tombol Kembali */}
                    <Link href={route('home')} className="text-blue-500 hover:underline mb-6 inline-block">
                        &larr; Kembali ke Daftar Mobil
                    </Link>q

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {/* Bagian Atas: Gambar dan Tombol Sewa */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2">
                                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">Gambar Utama Mobil</span>
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <h1 className="text-4xl font-bold text-gray-900">{car.brand} {car.model}</h1>
                                <p className="text-lg text-gray-500 mb-6">{car.category}</p>
                                <p className="text-3xl font-extrabold text-gray-900 mb-6">
                                    {formatRupiah(car.price_per_day)} <span className="font-normal text-xl">/ hari</span>
                                </p>
                                {auth.user ? (
                                <Link href={route('booking.create', car.id)} className="w-full text-center bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors">
                                    Rent Now
                                </Link>

                                ): (

                                <a href="#" className="w-full text-center bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors">
                                    Login Untuk Menyewa
                                </a>
                                )}
                            </div>
                        </div>

                        {/* Bagian Bawah: Spesifikasi dan Fitur */}
                        <div className="mt-12 text-gray-800">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">About this car</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Spesifikasi</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li><strong>Tahun:</strong> {car.year}</li>
                                        <li><strong>Kapasitas:</strong> {car.seating_capacity} Orang</li>
                                        <li><strong>Transmisi:</strong> {car.transmission}</li>
                                        <li><strong>Bahan Bakar:</strong> {car.fuel_type}</li>
                                        <li><strong>Mesin:</strong> {car.engine_specification}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Fitur Unggulan</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                                        {featuresArray.map((feature : any, index:any) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
