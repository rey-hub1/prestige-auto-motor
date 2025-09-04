import UserLayout from '@/layouts/user-layout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

// Definisikan tipe datanya
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
    cancellation_reason: string | null;
    car: Car;
}
interface MyBookingsPageProps {
    auth: { user: User };
    bookings: Booking[];
}

// Fungsi helper untuk format mata uang
const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

export default function MyBookings({ auth, bookings }: MyBookingsPageProps) {
    const getStatusClass = (status: string) => {
        if (status === 'pending') return 'bg-yellow-200 text-yellow-800';
        if (status === 'waiting_payment') return 'bg-blue-200 text-blue-800';
        if (status === 'success') return 'bg-green-200 text-green-800';
        if (status === 'cancelled') return 'bg-red-200 text-red-800';
        return 'bg-gray-200 text-gray-800';
    };

    return (
        <>
            <Head title="My Bookings" />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* Header Sederhana Buatan Sendiri */}
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Riwayat Booking Saya</h1>
                        <Link href={route('home')} className="text-sm text-blue-500 hover:underline">
                            Kembali ke Home
                        </Link>
                    </div>
                </header>

                {/* Konten Utama */}
                <main>
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    {bookings.length > 0 ? (
                                        <div className="space-y-4">
                                            {bookings.map((booking) => (
                                                <div key={booking.id} className="rounded-lg border p-4 dark:border-gray-700">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-bold">
                                                                {booking.car.brand} {booking.car.model}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {booking.start_date} s/d {booking.end_date}
                                                            </p>
                                                            <p className="text-sm font-semibold">{formatRupiah(booking.total_price)}</p>
                                                        </div>
                                                        <span className="rounded-full px-3 py-1 text-xs font-semibold capitalize">
                                                            {booking.status.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                    {/* Tampilkan blok ini HANYA JIKA statusnya 'cancelled' DAN ada alasannya */}
                                                    {booking.status === 'cancelled' && booking.cancellation_reason && (
                                                        <div className="mt-3 border-t pt-3">
                                                            <p className="text-sm font-bold text-red-700">Alasan Pembatalan:</p>
                                                            <p className="text-sm text-gray-600">{booking.cancellation_reason}</p>
                                                        </div>
                                                    )}
                                                    {booking.status === 'waiting_payment' && (
                                                        <div className="mt-4 border-t dark:border-gray-700">
                                                            <a
                                                                href={route('booking.pay', booking.id)}
                                                                className="inline-block rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
                                                            >
                                                                Bayar Via Whatsapp
                                                            </a>
                                                        </div>
                                                    )}
                                                    {booking.status === 'pending' && (
                                                        <div className="mt-4 border-t pt-4 dark:border-gray-700">
                                                            <Link
                                                                href={route('booking.cancel.user', booking.id)}
                                                                method="patch"
                                                                as="button"
                                                                className="text-sm text-red-600 hover:text-red-800"
                                                                onBefore={() => confirm('Apakah kamu yakin ingin membatalkan booking ini?')}
                                                            >
                                                                Batalkan Booking
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Kamu belum memiliki riwayat booking.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

MyBookings.layout = (page: React.ReactElement<MyBookingsPageProps>) => <UserLayout user={page.props.auth.user} children={page} />;
