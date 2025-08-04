import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface User { name: string; }
interface CreatePageProps {auth: {user : User}}

export default function Create({auth}: CreatePageProps) {
    const { data, setData, post, processing, errors } = useForm({
        brand: '',
        model: '',
        category: 'Sport',
        year: 2024,
        price_per_day: 0,
        color: '',
        transmission: 'Otomatis',
        fuel_type: 'Bensin',
        seating_capacity: 2,
        engine_specification: '',
        // Fitur diinput sebagai teks, dipisahkan koma
        features: 'Captain Seats, Leather Seats, Sunroof',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.cars.store'));
    };

    return (
        <>
            <Head title="Tambah Mobil Baru" />
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Tambah Mobil Baru</h1>
                        <Link href={route('admin.cars.index')} className="text-sm text-blue-500 hover:underline">
                            Kembali ke Daftar Mobil
                        </Link>
                    </div>

                    <form onSubmit={submit} className="space-y-6 text-black">
                        {/* Baris 1: Merek & Model */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Merek</label>
                                <input type="text" id="brand" value={data.brand} onChange={e => setData('brand', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                                {errors.brand && <p className="text-sm text-red-500 mt-1">{errors.brand}</p>}
                            </div>
                            <div>
                                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                                <input type="text" id="model" value={data.model} onChange={e => setData('model', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                                {errors.model && <p className="text-sm text-red-500 mt-1">{errors.model}</p>}
                            </div>
                        </div>

                        {/* Baris 2: Kategori, Tahun, Harga */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
                                <input type="text" id="category" value={data.category} onChange={e => setData('category', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                                {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
                            </div>
                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Tahun</label>
                                <input type="number" id="year" value={data.year} onChange={e => setData('year', parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                                {errors.year && <p className="text-sm text-red-500 mt-1">{errors.year}</p>}
                            </div>
                            <div>
                                <label htmlFor="price_per_day" className="block text-sm font-medium text-gray-700">Harga / Hari</label>
                                <input type="number" id="price_per_day" value={data.price_per_day} onChange={e => setData('price_per_day', parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                                {errors.price_per_day && <p className="text-sm text-red-500 mt-1">{errors.price_per_day}</p>}
                            </div>
                        </div>

                        {/* Baris 3: Detail Teknis */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <label htmlFor="color" className="block text-sm font-medium text-gray-700">Warna</label>
                                <input type="text" id="color" value={data.color} onChange={e => setData('color', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                                {errors.color && <p className="text-sm text-red-500 mt-1">{errors.color}</p>}
                            </div>
                             <div>
                                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmisi</label>
                                <input type="text" id="transmission" value={data.transmission} onChange={e => setData('transmission', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                                {errors.transmission && <p className="text-sm text-red-500 mt-1">{errors.transmission}</p>}
                            </div>
                            <div>
                                <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700">Bahan Bakar</label>
                                <input type="text" id="fuel_type" value={data.fuel_type} onChange={e => setData('fuel_type', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                                {errors.fuel_type && <p className="text-sm text-red-500 mt-1">{errors.fuel_type}</p>}
                            </div>
                            <div>
                                <label htmlFor="seating_capacity" className="block text-sm font-medium text-gray-700">Kapasitas</label>
                                <input type="number" id="seating_capacity" value={data.seating_capacity} onChange={e => setData('seating_capacity', parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                                {errors.seating_capacity && <p className="text-sm text-red-500 mt-1">{errors.seating_capacity}</p>}
                            </div>
                        </div>

                        {/* Baris 4: Spesifikasi & Fitur */}
                        <div>
                            <label htmlFor="engine_specification" className="block text-sm font-medium text-gray-700">Spesifikasi Mesin</label>
                            <input type="text" id="engine_specification" value={data.engine_specification} onChange={e => setData('engine_specification', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                            {errors.engine_specification && <p className="text-sm text-red-500 mt-1">{errors.engine_specification}</p>}
                        </div>
                        <div>
                            <label htmlFor="features" className="block text-sm font-medium text-gray-700">Fitur (pisahkan dengan koma)</label>
                            <textarea id="features" value={data.features} onChange={e => setData('features', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows={3} required></textarea>
                            {errors.features && <p className="text-sm text-red-500 mt-1">{errors.features}</p>}
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" disabled={processing} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                                Simpan Mobil
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


Create.layout = (page: React.ReactElement<CreatePageProps>) => (
    <AdminLayout
        user={page.props.auth.user}
        header="Dashboard"
        children={page}
    />
);

