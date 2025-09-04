import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'; // <-- 2. Import komponen AlertDialog


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
    const [carToDelete, setCarToDelete] = useState<Car | null>(null);

    // fungsi saat hapus
    const deleteCar = () => {
        if (carToDelete) {
            router.delete(route('admin.cars.destroy', carToDelete.id), {
                // Tutup modal setelah selesai
                onFinish: () => setCarToDelete(null),
            });
        }
    };
    return (
        <>
            <Head title="Manajemen Mobil" />
            <div className="min-h-screen bg-gray-100">
                {/* Header Sederhana */}
                <header className="bg-white shadow">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-xl leading-tight font-semibold text-gray-800">Manajemen Mobil</h1>
                        <Link href={route('admin.dashboard')} className="text-sm text-blue-500 hover:underline">
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </header>

                {/* Konten Utama */}
                <main className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-bold">Daftar Mobil</h3>
                                    <Link
                                        href={route('admin.cars.create')}
                                        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
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
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {cars.map((car) => (
                                                <tr key={car.id}>
                                                    <td className="px-6 py-4 text-sm font-bold whitespace-nowrap">
                                                        {car.brand} {car.model}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap">{formatRupiah(car.price_per_day)}</td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap capitalize">{car.status}</td>
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                href={route('admin.cars.edit', car.id)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => setCarToDelete(car)} // Saat diklik, simpan data mobil & buka modal
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Hapus
                                                            </button>
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
              <AlertDialog open={!!carToDelete} onOpenChange={() => setCarToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Kamu Yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini akan menghapus data mobil **{carToDelete?.brand} {carToDelete?.model}** secara permanen. Data yang sudah dihapus tidak bisa dikembalikan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteCar} className="bg-destructive hover:bg-destructive/90">
                            Ya, Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

Index.layout = (page: React.ReactElement<CarsIndexProps>) => <AdminLayout user={page.props.auth.user} header="Dashboard" children={page} />;
