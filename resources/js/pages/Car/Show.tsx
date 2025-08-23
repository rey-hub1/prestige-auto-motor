import UserLayout from '@/layouts/user-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Fuel, Gauge, Heart, Ruler, Settings, Users } from 'lucide-react';
import { useState } from 'react';
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
    stock: number;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface ShowProps {
    auth: {
        user: User | null;
    };
    car: Car;
}

const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

export default function Show({ auth, car }: ShowProps) {
    const [activeTab, setActiveTab] = useState('about');

    const featuresArray = Array.isArray(car.features) ? car.features : JSON.parse(car.features);
    console.log(featuresArray);
    return (
        <>
            <Head title={`${car.brand} ${car.model}`} />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
                    <Link href={route('home')}>
                        <ArrowLeft className="h-6 w-6 cursor-pointer text-gray-700 hover:text-gray-900" />
                    </Link>
                    <h1 className="text-xl font-semibold text-gray-900">Car Details</h1>
                    <Heart className="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-600" />
                </header>

                {/* Car Image Section */}
                <section className="relative bg-gradient-to-br from-gray-200 via-gray-100 to-white px-6 py-16">
                    <div className="mx-auto max-w-5xl">
                        {/* Car Image with Overlay Effect */}
                        <div className="relative">
                            <div className="h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 shadow-2xl">
                                {/* Car silhouette with blend mode overlay effect */}
                                <div className="relative h-full w-full bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400 mix-blend-overlay">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Stylized car shape */}
                                        <div className="relative">
                                            <div className="h-24 w-96 -rotate-1 transform rounded-full bg-gray-900 opacity-80"></div>
                                            <div className="absolute top-4 left-8 h-16 w-80 rounded-full bg-gray-800 opacity-60"></div>
                                            <div className="absolute top-6 left-16 h-12 w-64 rounded-full bg-gray-700 opacity-40"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Car Info Section */}
                <section className="bg-white px-6 py-8">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="mb-2 text-3xl font-bold text-gray-900">{car.brand} {car.model}</h2>
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-500">Sport</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-gray-900">Rp {car.price_per_day}</span>
                                    <span className="text-gray-500">/hari</span>
                                </div>
                                {auth.user ? (
                                    <Link
                                        href={route('booking.create', car.id)}
                                        className=" rounded-lg bg-blue-500 px-6 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-600"
                                    >
                                        Rent Now
                                    </Link>
                                ) : (
                                    <a
                                        href="#"
                                        className=" rounded-lg bg-blue-500 px-6 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-600"
                                    >
                                        Login Untuk Menyewa
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="mb-8 flex space-x-8 border-b border-gray-200">
                            {['about', 'gallery', 'review'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-1 pb-4 font-medium capitalize transition-colors ${
                                        activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'about' && (
                            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                                {/* Specifications */}
                                <div>
                                    <h3 className="mb-6 text-xl font-semibold text-gray-900">Spesifikasi</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <Settings className="h-5 w-5 text-gray-500" />
                                            <div className="flex-1">
                                                <span className="text-gray-600">{car.engine_specification}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Fuel className="h-5 w-5 text-gray-500" />
                                            <div className="flex-1">
                                                <span className="text-gray-600">55L {car.fuel_type}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="h-5 w-5 rounded-full bg-gray-500"></div>
                                            <div className="flex-1">
                                                <span className="text-gray-600">{car.color}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Calendar className="h-5 w-5 text-gray-500" />
                                            <div className="flex-1">
                                                <span className="text-gray-600">{car.year}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Settings className="h-5 w-5 text-gray-500" />
                                            <div className="flex-1">
                                                <span className="text-gray-600">{car.transmission}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Users className="h-5 w-5 text-gray-500" />
                                            <div className="flex-1">
                                                <span className="text-gray-600">{car.seating_capacity}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Gauge className="h-5 w-5 text-gray-500" />
                                            <div className="flex-1">
                                                <span className="text-gray-600">90Km/L</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Ruler className="h-5 w-5 text-gray-500" />
                                            <div className="flex-1">
                                                <span className="text-gray-600">(P x L x T) 4,945 mm x 1,850 mm x 1,695 mm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className="mb-6 text-xl font-semibold text-gray-900">Fitur Unggulan</h3>
                                    <div className="space-y-3">
                                        {[
                                            'Captain Seats',
                                            'Full Leather Seats',
                                            'Sunroof & Moonroof',
                                            'Ambient Cabin Lighting',
                                            'Premium Audio System',
                                            'Head Unit Touchscreen',
                                            'Rear Seat Entertainment',
                                            'Electric Sliding Doors',
                                            '360 Parking Camera & Sensors',
                                            'Keyless Entry & Start/Stop Button',
                                            '7 Airbags',
                                        ].map((feature, i) => (
                                            <div key={i} className="flex items-center space-x-3">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'gallery' && (
                            <div>
                                <h3 className="mb-8 text-2xl font-semibold text-gray-900">Photo Gallery</h3>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Main large image */}
                                    <div className="md:col-span-2 lg:col-span-2">
                                        <div className="h-80 overflow-hidden rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg">
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400 mix-blend-overlay">
                                                <div className="text-lg font-medium text-white">Koenigsegg Jesko - Front View</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Side images */}
                                    <div className="space-y-6">
                                        <div className="h-36 overflow-hidden rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg">
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-500 via-gray-400 to-gray-300 mix-blend-overlay">
                                                <div className="text-sm font-medium text-white">Side View</div>
                                            </div>
                                        </div>
                                        <div className="h-36 overflow-hidden rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg">
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-500 via-gray-400 to-gray-300 mix-blend-overlay">
                                                <div className="text-sm font-medium text-white">Rear View</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional images */}
                                    <div className="h-48 overflow-hidden rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-500 via-gray-400 to-gray-300 mix-blend-overlay">
                                            <div className="text-sm font-medium text-white">Interior</div>
                                        </div>
                                    </div>
                                    <div className="h-48 overflow-hidden rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-500 via-gray-400 to-gray-300 mix-blend-overlay">
                                            <div className="text-sm font-medium text-white">Dashboard</div>
                                        </div>
                                    </div>
                                    <div className="h-48 overflow-hidden rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-500 via-gray-400 to-gray-300 mix-blend-overlay">
                                            <div className="text-sm font-medium text-white">Engine</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'review' && (
                            <div>
                                <h3 className="mb-8 text-2xl font-semibold text-gray-900">Customer Reviews</h3>
                                <div className="space-y-6">
                                    {/* Overall Rating */}
                                    <div className="rounded-xl bg-gray-50 p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <div className="text-3xl font-bold text-gray-900">4.8</div>
                                                <div className="mt-1 flex items-center space-x-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className={`h-4 w-4 rounded ${i < 5 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                                                    ))}
                                                </div>
                                                <div className="mt-1 text-sm text-gray-500">Based on 156 reviews</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Individual Reviews */}
                                    {[
                                        {
                                            name: 'Ahmad Wijaya',
                                            rating: 5,
                                            date: '2 hari yang lalu',
                                            comment:
                                                'Mobil sangat bagus dan pelayanan memuaskan. Kondisi mobil bersih dan terawat dengan baik. Highly recommended!',
                                        },
                                        {
                                            name: 'Sari Indah',
                                            rating: 5,
                                            date: '1 minggu yang lalu',
                                            comment:
                                                'Pengalaman rental yang luar biasa. Staff ramah dan profesional. Mobil sesuai dengan foto dan deskripsi.',
                                        },
                                        {
                                            name: 'Budi Santoso',
                                            rating: 4,
                                            date: '2 minggu yang lalu',
                                            comment:
                                                'Overall bagus, hanya saja proses pickup agak lama. Tapi mobilnya excellent dan nyaman untuk perjalanan jauh.',
                                        },
                                    ].map((review, i) => (
                                        <div key={i} className="rounded-xl border border-gray-200 p-6">
                                            <div className="mb-3 flex items-start justify-between">
                                                <div>
                                                    <div className="font-semibold text-gray-900">{review.name}</div>
                                                    <div className="mt-1 flex items-center space-x-1">
                                                        {[...Array(5)].map((_, j) => (
                                                            <div
                                                                key={j}
                                                                className={`h-3 w-3 rounded ${j < review.rating ? 'bg-yellow-400' : 'bg-gray-300'}`}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-500">{review.date}</div>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <div className="min-h-screen bg-gray-100">
                <main className="container mx-auto p-4 md:p-8">
                    {/* Tombol Kembali */}
                    <Link href={route('home')} className="mb-6 inline-block text-blue-500 hover:underline">
                        &larr; Kembali ke Daftar Mobil
                    </Link>

                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        {/* Bagian Atas: Gambar dan Tombol Sewa */}
                        <div className="flex flex-col gap-8 md:flex-row">
                            <div className="md:w-1/2">
                                <div className="flex h-80 w-full items-center justify-center rounded-lg bg-gray-200">
                                    <span className="text-gray-500">Gambar Utama Mobil</span>
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <h1 className="text-4xl font-bold text-gray-900">
                                    {car.brand} {car.model}
                                </h1>
                                <p className="mb-6 text-lg text-gray-500">{car.category}</p>
                                <p className="mb-6 text-3xl font-extrabold text-gray-900">
                                    {formatRupiah(car.price_per_day)} <span className="text-xl font-normal">/ hari</span>
                                </p>
                                {auth.user ? (
                                    <Link
                                        href={route('booking.create', car.id)}
                                        className="w-full rounded-lg bg-blue-500 px-6 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-600"
                                    >
                                        Rent Now
                                    </Link>
                                ) : (
                                    <a
                                        href="#"
                                        className="w-full rounded-lg bg-blue-500 px-6 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-600"
                                    >
                                        Login Untuk Menyewa
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Bagian Bawah: Spesifikasi dan Fitur */}
                        <div className="mt-12 text-gray-800">
                            <h2 className="mb-4 text-2xl font-bold text-gray-800">About this car</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div>
                                    <h3 className="mb-3 text-xl font-semibold">Spesifikasi</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>
                                            <strong>Tahun:</strong> {car.year}
                                        </li>
                                        <li>
                                            <strong>Kapasitas:</strong> {car.seating_capacity} Orang
                                        </li>
                                        <li>
                                            <strong>Transmisi:</strong> {car.transmission}
                                        </li>
                                        <li>
                                            <strong>Bahan Bakar:</strong> {car.fuel_type}
                                        </li>
                                        <li>
                                            <strong>Mesin:</strong> {car.engine_specification}
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="mb-3 text-xl font-semibold">Fitur Unggulan</h3>
                                    {/* <ul className="list-inside list-disc space-y-2 text-gray-700">
                                        {featuresArray.map((feature: any, index: any) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

Show.layout = (page: React.ReactElement<ShowProps>) => <UserLayout user={page.props.auth.user} children={page} />;
