import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';

// Definisikan tipe datanya secara lengkap
interface User { name: string; }
interface Car { brand: string; model: string; }
interface Booking {
    id: number;
    start_date: string;
    end_date: string;
    status: string;
    user: User;
    car: Car;
}
interface AdminDashboardProps {
    auth: { user: User };
    bookings: Booking[];
}

export default function Dashboard({ auth, bookings }: AdminDashboardProps) {
    const {patch: cancelBooking} = useForm({
            cancellation_reason: '',
    })

    const handleCancel = (bookingId :number) => {
        const reason = window.prompt('Masukan alasan pembatasan booking: ')
        if(reason && reason.length >= 10){
            const form = useForm({cancellation_reason: reason});
            form.patch(route('admin.booking.cancel', bookingId));
        }else if (reason) {
            alert('Alasan Pembatalan minimal 5 karakter')
        }
    }
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-gray-100">
                {/* Header Sederhana */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                            Admin Dashboard
                        </h1>
                        <Link href={route('home')} className="text-sm text-blue-500 hover:underline">
                            Kembali ke Home
                        </Link>
                    </div>
                </header>

                {/* Konten Utama */}
                <main className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-lg font-bold mb-4">Daftar Semua Booking</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobil</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.car.brand} {booking.car.model}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.start_date} - {booking.end_date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize">
                                                            {booking.status.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        {booking.status === 'pending' && (
                                                            <div className="flex space-x-2">
                                                                <Link
                                                                    href={route('admin.booking.confirm', booking.id)}
                                                                    method='patch'
                                                                    as='button'
                                                                    className='text-green-600 hover:text-green-900'
                                                                    preserveScroll
                                                                >
                                                                    Confirm
                                                                </Link>

                                                                <button
                                                                    onClick={() => handleCancel(booking.id)}
                                                                    className='text-red-600 hover:text-red-900'
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        )}
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

Dashboard.layout = (page: React.ReactElement<AdminDashboardProps>) => (
    <AdminLayout
        user={page.props.auth.user}
        header="Dashboard"
        children={page}
    />
);
