// resources/js/Pages/Booking/Create.tsx
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Tipe data untuk props
interface Car {
    id: number;
    brand: string;
    model: string;
    price_per_day: number;
}
interface BookingCreateProps {
    car: Car;
}

export default function Create({ car }: BookingCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        car_id: car.id,
        start_date: '',
        end_date: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('booking.store'));
    };

    return (
        <>
            <Head title={`Booking ${car.brand} ${car.model}`} />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-2">Konfirmasi Booking</h1>
                    <p className="text-gray-600 mb-6">You are booking: <span className="font-semibold">{car.brand} {car.model}</span></p>

                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                                <input
                                    type="date"
                                    id="start_date"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    required
                                />
                                {errors.start_date && <p className="text-sm text-red-500 mt-1">{errors.start_date}</p>}
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                <input
                                    type="date"
                                    id="end_date"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    required
                                />
                                {errors.end_date && <p className="text-sm text-red-500 mt-1">{errors.end_date}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400"
                            disabled={processing}
                        >
                            {processing ? 'Processing...' : 'Konfirmasi Booking'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
