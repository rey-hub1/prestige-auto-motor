import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
// Definisikan tipe datanya
interface Car {
    id: number;
    brand: string;
    model: string;
    price_per_day: number;
    status: string;
}
interface CarsIndexProps {
    auth: { user: any };
    cars: Car[];
}

const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

export default function Index({ auth, cars }: CarsIndexProps) {
    return (
        <>
            <Head title="Manajemen Mobil" />
            <div className="min-h-screen bg-gray-100">
                {/* Header Sederhana */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                            Manajemen Mobil
                        </h1>
                        <Link href={route('admin.dashboard')} className="text-sm text-blue-500 hover:underline">
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </header>

                {/* Konten Utama */}
                <main className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">Daftar Mobil</h3>
                                    <Link
                                        href={route('admin.cars.create')}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600"
                                    >
                                        Tambah Mobil
                                    </Link>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobil</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga/Hari</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {cars.map((car) => (
                                                <tr key={car.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{car.brand} {car.model}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatRupiah(car.price_per_day)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{car.status}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <Link href={route('admin.cars.edit', car.id)} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                                            <Link
                                                                href={route('admin.cars.destroy', car.id)}
                                                                method="delete" // Menggunakan metode DELETE
                                                                as="button"      // Tampil sebagai tombol
                                                                className="text-red-600 hover:text-red-900"
                                                                // Munculkan konfirmasi sebelum request dikirim
                                                                onBefore={() => confirm('Apakah Anda yakin ingin menghapus mobil ini?')}
                                                            >
                                                                Hapus</Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}


Index.layout = (page: React.ReactElement<CarsIndexProps>) => (
    <AdminLayout
        user={page.props.auth.user}
        header="Dashboard"
        children={page}
    />
);

