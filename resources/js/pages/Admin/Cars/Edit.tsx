import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { LargeNumberLike } from 'crypto';
import { useState } from 'react';

// Definisikan tipe Car
interface Car {
    id: number;
    brand: string;
    model: string;
    category: string;
    year: number;
    price_per_day: number;
    color: string;
    transmission: string;
    fuel_type: string;
    seating_capacity: number;
    engine_specification: string;
    features: string; // Di form ini, kita terima sebagai string
    stock: number;
    image_url: string | null;
}
interface EditPageProps {
    auth: { user: { name: string } };
    car: Car;
}
export default function Edit({ auth, car }: EditPageProps) {
    // Isi useForm dengan data dari prop 'car'
    const { data, setData, processing, errors } = useForm({
        brand: car.brand,
        model: car.model,
        category: car.category,
        year: car.year,
        price_per_day: car.price_per_day,
        color: car.color,
        transmission: car.transmission,
        fuel_type: car.fuel_type,
        seating_capacity: car.seating_capacity,
        engine_specification: car.engine_specification,
        features: car.features,
        image_url: null as File | null,

    });

    const [imagePreview, setImagePreview] = useState<string |null>(car.image_url);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if(file){
            setData('image_url', file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gunakan method 'patch' untuk update
          router.post(route('admin.cars.update', car.id), {
            _method: 'patch', // Ini bilang ke Laravel, "Bro, ini sebenernya PATCH"
            ...data,          // Kirim semua datanya
        });
    };

    return (
        <>
            <Head title={`Edit Mobil - ${car.brand}`} />
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-6">Edit Mobil</h1>
                    {/* Form-nya sama persis seperti Create.tsx, hanya value-nya sudah terisi */}
                    <form onSubmit={submit} className="space-y-6">
                        {/* Merek & Model */}
                        <div>
                           <label htmlFor="brand">Merek</label>
                           <input id="brand" value={data.brand} onChange={e => setData('brand', e.target.value)} className="mt-1 block w-full rounded-md" />
                           {errors.brand && <p className="text-sm text-red-500">{errors.brand}</p>}
                        </div>
                        {/* ... Tambahkan semua input lainnya persis seperti di Create.tsx ... */}
                        {/* Contoh: */}
                        <div>
                           <label htmlFor="model">Model</label>
                           <input id="model" value={data.model} onChange={e => setData('model', e.target.value)} className="mt-1 block w-full rounded-md" />
                           {errors.model && <p className="text-sm text-red-500">{errors.model}</p>}
                        </div>
                         <div>
                            <label htmlFor="features">Fitur (pisahkan dengan koma)</label>
                            <textarea id="features" value={data.features} onChange={e => setData('features', e.target.value)} className="mt-1 block w-full rounded-md" rows={3}></textarea>
                            {errors.features && <p className="text-sm text-red-500">{errors.features}</p>}
                        </div>
                        {/* ... Lanjutkan untuk semua field lainnya ... */}


                        {/* Gambar */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">Foto Mobil</label>
                        {/* Tampilkan gambar lama/preview gambar baru */}
                        {imagePreview && (
                            <div className="mt-2">
                                <img src={imagePreview} alt="Preview" className="w-48 h-auto rounded-md border" />
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengganti gambar.</p>
                        {errors.image_url && <p className="text-sm text-red-500 mt-1">{errors.image_url}</p>}
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" disabled={processing} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400">
                            Update Mobil
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
}


Edit.layout = (page: React.ReactElement<EditPageProps>) => (
    <AdminLayout
        user={page.props.auth.user}
        header="Dashboard"
        children={page}
    />
);

