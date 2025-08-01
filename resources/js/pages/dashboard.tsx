import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types'; // Kita hanya butuh BreadcrumbItem dari sini
import { Head, useForm } from '@inertiajs/react';

// 1. Definisikan semua tipe data yang kita butuhkan di sini
interface User {
    id: number;
    name: string;
    email: string;
}
interface Car {
    brand: string;
    model: string;
}
interface Booking {
    id: number;
    start_date: string;
    end_date: string;
    total_price: number;
    status: string;
    car: Car;
}

// ✅ FIX #1: Buat interface props yang lengkap, sertakan 'auth' di dalamnya
interface DashboardPageProps {
    auth: { user: User };
    bookings: Booking[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
];

const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};


export default function Dashboard({ auth, bookings }: DashboardPageProps) {
    
    return (
        // ✅ FIX #2: Hapus prop `user={auth.user}` karena AppLayout tidak membutuhkannya
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                {/* Kita ganti semua placeholder dengan daftar booking */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-neutral-900/50">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Riwayat Booking Saya</h2>
                    {bookings.length > 0 ? (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="border dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{booking.car.brand} {booking.car.model}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {booking.start_date} s/d {booking.end_date}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{formatRupiah(booking.total_price)}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${booking.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">Kamu belum memiliki riwayat booking.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
