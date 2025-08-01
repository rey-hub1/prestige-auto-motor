import { Head, Link } from '@inertiajs/react';

// Definisikan tipe datanya
interface User { id: number; name: string; email: string; }
interface Car { brand: string; model: string; }
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
    }
    return (
        <>
            <Head title="My Bookings" />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* Header Sederhana Buatan Sendiri */}
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            Riwayat Booking Saya

                        </h1>
                        <Link href={route('home')} className="text-sm text-blue-500 hover:underline">
                            Kembali ke Home
                        </Link>
                    </div>
                </header>

                {/* Konten Utama */}
                <main>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    {bookings.length > 0 ? (
                                        <div className="space-y-4">
                                            {bookings.map((booking) => (
                                                <div key={booking.id} className="border dark:border-gray-700 rounded-lg p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="font-bold text-lg">{booking.car.brand} {booking.car.model}</h3>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">{booking.start_date} s/d {booking.end_date}</p>
                                                            <p className="text-sm font-semibold">{formatRupiah(booking.total_price)}</p>
                                                        </div>
                                                        <span className="px-3 py-1 text-xs font-semibold rounded-full capitalize">
                                                            {booking.status.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                    {booking.status === 'cancelled' && booking.cancellation_reason && (
                                                        <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 text-red-700 dark:text-red-300">
                                                            <p className="font-bold">Alasan Pembatalan:</p>
                                                            <p>{booking.cancellation_reason}</p>
                                                        </div>
                                                    )}
                                                    {booking.status === 'waiting_payment' && (
                                                        <div className='mt-4 border-t dark:border-gray-700'>
                                                            <a
                                                                href={route('booking.pay', booking.id)}
                                                                className='inline-block bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600'
                                                            >
                                                                Bayar Via Whatsapp
                                                            </a>
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
