<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::latest()->get();
        return Inertia::render('Admin/Cars/Index', [
            'cars' => $cars,
        ]);
    }

    // Nampilin FOrm
    public function create()
    {
        return Inertia::render(('Admin/Cars/Create'));
    }

    // Menyimpan data baru
    public function store(Request $request)
    {
        $maxYear = date('Y') + 1;
        $validateData = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|integer|min:1990|max:' . $maxYear,
            'price_per_day' => 'required|integer|min:0',
            'color' => 'required|string|max:255',
            'transmission' => 'required|string|max:255',
            'fuel_type' => 'required|string|max:255',
            'seating_capacity' => 'required|integer|min:1',
            'engine_specification' => 'required|string|max:255',
            'features' => 'required|string',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('image_url')) {
            // Simpan gambar ke storage/app/public/cars
            $path = $request->file('image_url')->store('cars', 'public');
            $validateData['image_url'] = '/storage/' . $path;
        }

        $validateData['features'] = json_decode($validateData['features'], true);

        Car::create($validateData);

        return to_route('admin.cars.index');
    }

    public function edit(Car $car)
    {
        if (is_array($car->features)) {
            $car->features = implode(', ', $car->features);
        }

        $car->features = implode(', ', $car->features ?? []);

        return Inertia::render('Admin/Cars/Edit', [
            'car' => $car,
        ]);
    }

    public function update(Request $request, Car $car)
    {
        // dd($request->all());
        $maxYear = date('Y') + 1;
        $validatedData = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|integer|min:1990|max:' . $maxYear,
            'price_per_day' => 'required|integer|min:0',
            'color' => 'required|string|max:255',
            'transmission' => 'required|string|max:255',
            'fuel_type' => 'required|string|max:255',
            'seating_capacity' => 'required|integer|min:1',
            'engine_specification' => 'required|string|max:255',
            'features' => 'nullable|string',
            // Validasi untuk gambar baru (opsional)
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Cek kalo ada file gambar yang baru di uploud
        if ($request->hasFile('image_url')) {
            // 1. Hapus gambar lama dari storage (jika ada)
            if ($car->image_url) {
                // Ubah path URL (/storage/...) menjadi path file (cars/...)
                $oldPath = str_replace('/storage/', '', $car->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            // 2. Simpan gambar baru dan update path-nya
            $path = $request->file('image_url')->store('cars', 'public');
            $validatedData['image_url'] = '/storage/' . $path;
        }


        // Ubah string features dari form menjadi array sebelum di simpan
        $validateData['features'] = array_map('trim', explode(',', $validatedData['features']));

        // Update data mobil yang ada
        $car->update($validatedData);

        return to_route('admin.cars.index');
    }

    public function destroy(Car $car)
    {
        $car->delete();

        return to_route('admin.cars.index');
    }
}
