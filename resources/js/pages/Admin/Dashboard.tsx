import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'; // <-- 2. Import komponen Dialog
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Definisikan tipe datanya secara lengkap
interface User {
    name: string;
}
interface Car {
    brand: string;
    model: string;
}
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
    const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
    const { data, setData, patch, processing, errors, reset } = useForm({
        cancellation_reason: ',',
    });
    const { patch: cancelBooking } = useForm({
        cancellation_reason: '',
    });

    const handleCancelSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (bookingToCancel) {
            patch(route('admin.booking.cancel', bookingToCancel.id), {
                onSuccess: () => {
                    setBookingToCancel(null); // Tutup modal
                    reset('cancellation_reason'); // Kosongkan input
                },
            });
        }
    };
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-gray-100">
                {/* Header Sederhana */}
                <header className="bg-white shadow">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-xl leading-tight font-semibold text-gray-800">Admin Dashboard</h1>
                        <Link href={route('home')} className="text-sm text-blue-500 hover:underline">
                            Kembali ke Home
                        </Link>
                    </div>
                </header>

                {/* Konten Utama */}
                <main className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="mb-4 text-lg font-bold">Daftar Semua Booking</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    User
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Mobil
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Tanggal
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{booking.user.name}</td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                        {booking.car.brand} {booking.car.model}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {booking.start_date} - {booking.end_date}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                        <span className="inline-flex rounded-full px-2 text-xs leading-5 font-semibold capitalize">
                                                            {booking.status.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                        {booking.status === 'pending' && (
                                                            <div className="flex space-x-2">
                                                                <Link
                                                                    href={route('admin.booking.confirm', booking.id)}
                                                                    method="patch"
                                                                    as="button"
                                                                    className="text-green-600 hover:text-green-900"
                                                                >
                                                                    Confirm
                                                                </Link>
                                                                {/* 4. Ubah tombol Cancel */}
                                                                <button
                                                                    onClick={() => setBookingToCancel(booking)}
                                                                    className="text-red-600 hover:text-red-900"
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
            <Dialog open={!!bookingToCancel} onOpenChange={() => setBookingToCancel(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleCancelSubmit}>
                        <DialogHeader>
                            <DialogTitle>Batalkan Booking</DialogTitle>
                            <DialogDescription>
                                Masukkan alasan mengapa booking ini dibatalkan. Pesan ini akan dilihat oleh pengguna.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cancellation_reason" className="text-right">
                                    Alasan
                                </Label>
                                <Input
                                    id="cancellation_reason"
                                    value={data.cancellation_reason}
                                    onChange={(e) => setData('cancellation_reason', e.target.value)}
                                    className="col-span-3"
                                    required
                                    minLength={10}
                                />
                                {errors.cancellation_reason && <p className="col-span-4 text-sm text-red-500">{errors.cancellation_reason}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" variant="destructive" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Batalkan Booking'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

Dashboard.layout = (page: React.ReactElement<AdminDashboardProps>) => <AdminLayout user={page.props.auth.user} header="Dashboard" children={page} />;
