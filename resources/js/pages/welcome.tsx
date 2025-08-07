// Lokasi: resources/js/Pages/Welcome.tsx

import { Button } from '@/components/Button';
import UserLayout from '@/layouts/user-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import React from 'react';

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
interface CategoryCardData {
    title: string;
    count: number;
    imageUrl: string;
    href: string;
}

// 2. Buat array yang berisi data untuk setiap kartu
const categoryData: CategoryCardData[] = [
    {
        title: 'Sport',
        count: 2,
        imageUrl: '/images/home/categories/sport.png', // Path relatif dari folder 'public'
        href: '/cars?category=sport',
    },
    {
        title: 'Convertible',
        count: 0,
        imageUrl: '/images/home/categories/convertible.png',
        href: '/cars?category=convertible',
    },
    {
        title: 'Hatchback',
        count: 1,
        imageUrl: '/images/home/categories/hatchback.png',
        href: '/cars?category=hatchback',
    },
    {
        title: 'SUV',
        count: 3,
        imageUrl: '/images/home/categories/suv.png',
        href: '/cars?category=suv',
    },
    {
        title: 'Sedan',
        count: 7,
        imageUrl: '/images/home/categories/sedan.png',
        href: '/cars?category=sedan',
    },
];

const CategoryCard: React.FC<{ data: CategoryCardData }> = ({ data }) => {
    return (
        <a
            href={data.href}
            // Jadikan link ini sebagai container dengan gambar background
            className="group relative block h-64 w-full overflow-hidden rounded-lg bg-cover bg-center transition-transform duration-300 hover:scale-105"
            // Set gambar sebagai background lewat inline style
            style={{ backgroundImage: `url(${data.imageUrl})` }}
        >
            {/* Ganti overlay solid menjadi gradient untuk efek yang lebih bagus */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#456E8D]/70 to-[rgba(153,199,233,0.2)]"></div>

            {/* Pindahkan teks ke bawah dan gunakan flexbox */}
            <div className="absolute top-4 left-4 flex flex-col items-baseline space-x-2 text-white">
                <p className="text-lg font-bold">{data.count} car</p>
                <h3 className="text-2xl font-extrabold">{data.title}</h3>
            </div>
        </a>
    );
};

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
                <section className="relative pt-36 pb-20">
                    <div className="mx-auto flex max-w-6xl items-center">
                        <div className="w-[40vw] flex flex-col gap-2">
                            <h1 className="text-5xl">
                                <span className="text-primary">No.1 </span>Premium Car Rental In Bali
                            </h1>
                            <p>Wujudkan pengalaman berkendara terbaikmu di Bali dengan mobil premium pilihan kami.</p>
                            <Button variant="primary">Lihat Koleksi Mobil</Button>
                        </div>

                        {/* Car Image Placeholder */}
                        <img src="/images/home/poce.png" className='absolute top-1/2 right-0 -translate-y-1/2 h-[35vw]'  alt="" />
                    </div>
                </section>

                {/* Brand Logos */}
                {/* <section className="px-6 py-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex justify-center space-x-12">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="h-12 w-12 rounded-full bg-gray-300"></div>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Browse by Type */}
                <section className="px-6 py-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className='text-xl'>Browse By Type</h2>
                            <a className='flex flex-row items-center' href="">Lihat semua<ArrowRight className='h-4'/> </a>
                            {/* Belum ada page all car */}
                            {/* <Link href={route('')} className="text-sm text-blue-500 hover:underline">
                                Lihat Semua
                            </Link> */}
                        </div>

                        <div className="grid grid-cols-5 gap-6">
                            {categoryData.map((category) => (
                                <CategoryCard key={category.title} data={category} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trend Vehicle */}
                <section className="px-6 py-12">
                    <div className="mx-auto max-w-6xl">
                        <h2 className='text-xl'>Trend Vechicle</h2>

                        <div className="grid grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="rounded-lg border border-gray-200 bg-white p-6">
                                    <h3>Aston Martin dbs</h3>

                                    <div className="mb-6 w-full rounded ">
                                        <img src="/images/home/dbst.png" alt="" />
                                    </div>

                                    <div className="mb-4 flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <p>55L</p>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <p>Manual</p>
                                            </div>
                                            <div className="flex items-center space-x-1">4 People</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="text-xl">
                                            Rp.3,5Jt/<span className="text-base">hari</span>
                                        </p>
                                        <Button>Rent Now</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
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
