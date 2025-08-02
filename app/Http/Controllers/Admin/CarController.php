<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
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
        $validateData = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|integer|min:1990',
            'price_per_day' => 'required|integer|min:0',
            'color' => 'required|string|max:255',
            'transmission' => 'required|string|max:255',
            'fuel_type' => 'required|string|max:255',
            'seating_capacity' => 'required|integer|min:1',
            'engine_specification' => 'required|string|max:255',
            'features' => 'required|string',
        ]);

        $validateData['features'] = json_decode($validateData['features'], true);

        Car::create($validateData);

        return to_route('admin.cars.index');
    }

    public function edit(Car $car)
    {
        if (is_array($car->features)) {
            $car->features = implode(', ', $car->features);
        }

        return Inertia::render('Admin/Cars/Edit', [
            'car' => $car,
        ]);
    }

    public function update(Request $request, Car $car)
    {
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
            'features' => 'required|string',
        ]);

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
