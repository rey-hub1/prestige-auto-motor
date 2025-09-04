import UserLayout from '@/layouts/user-layout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

// Tipe data untuk mobil dan props
interface Car {
    id: number;
    brand: string;
    model: string;
    category: string;
    price_per_day: number;
    seating_capacity: number;
    transmission: string;
    image_url: string | null;
}
interface CarsIndexPageProps {
    auth: { user: any };
    cars: {
        data: Car[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        search: string;
        sort: string;
    };
}

// Komponen untuk satu kartu mobil (bisa dipisah ke file sendiri nanti)
const CarCard: React.FC<{ car: Car }> = ({ car }) => {
    const formatRupiah = (number: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    return (
        <Link
            href={route('car.show', car.id)}
            className="group block overflow-hidden rounded-lg border bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
            {/* Bagian Gambar */}
            <div className="relative h-48 w-full">
                {car.image_url ? (
                    // Jika ada gambar, tampilkan
                    <img
                        src={car.image_url}
                        alt={`Gambar ${car.brand} ${car.model}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    // Jika tidak ada gambar, tampilkan placeholder
                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                        <span className="text-sm text-gray-500">No Image Available</span>
                    </div>
                )}
            </div>

            {/* Bagian Detail Teks */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">
                    {car.brand} {car.model}
                </h3>
                <p className="mb-4 text-sm text-gray-500">{car.category}</p>

                <div className="mb-4 flex items-center space-x-4 text-xs text-gray-600">
                    <span>{car.seating_capacity} People</span>
                    <span>•</span>
                    <span>{car.transmission}</span>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-md font-extrabold text-gray-900">
                        {formatRupiah(car.price_per_day)} <span className="text-sm font-normal">/ hari</span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default function Index({ auth, cars, filters }: CarsIndexPageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [sort, setSort] = useState(filters.sort || '');

    // Efek ini akan berjalan setiap kali nilai 'search' atau 'sort' berubah
    useEffect(() => {
        // Bikin objek kosong dulu
        const params: { search?: string; sort?: string } = {};

        // Kalo 'search' ada isinya, baru masukin ke params
        if (search) {
            params.search = search;
        }
        // Kalo 'sort' ada isinya, baru masukin ke params
        if (sort) {
            params.sort = sort;
        }

        router.get(route('cars.index'), params, {
            preserveState: true,
            replace: true,
        });
    }, [search, sort]);

    return (
        <>
            <Head title="Our Cars" />
            <div className="container mx-auto px-6 py-12">
                <h1 className="mb-8 text-4xl font-bold">Our Premium Cars</h1>

                {/* Filter Section */}
                <div className="mb-8 flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:flex-row">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari mobil (e.g., Porsche)..."
                        className="flex-grow rounded-md border p-2"
                    />
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border p-2">
                        <option value="">Urutkan</option>
                        <option value="price_asc">Harga: Termurah</option>
                        <option value="price_desc">Harga: Termahal</option>
                    </select>
                </div>

                {/* Car Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cars.data.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center space-x-2">
                    {cars.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`rounded-md border px-4 py-2 ${link.active ? 'bg-blue-500 text-white' : 'bg-white'} ${!link.url ? 'cursor-not-allowed text-gray-400' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactElement<CarsIndexPageProps>) => <UserLayout user={page.props.auth.user} children={page} />;
