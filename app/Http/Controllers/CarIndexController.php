<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarIndexController extends Controller
{
    public function index(Request $request)
    {
        $cars = Car::query()
        // Kita tambahkan (string) untuk memaksa input jadi teks
        ->when((string) $request->input('search'), function ($query, $search) {
            $query->where('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%");
        })
        ->when((string) $request->input('sort'), function ($query, $sort) {
            if ($sort === 'price_asc') {
                $query->orderBy('price_per_day', 'asc');
            } elseif ($sort === 'price_desc') {
                $query->orderBy('price_per_day', 'desc');
            }
        })
        ->paginate(12)
        ->withQueryString();

    return Inertia::render('Cars/Index', [
        'cars' => $cars,
        'filters' => [
            'search' => $request->input('search'),
            'sort' => $request->input('sort'),
        ],
    ]);
    }
}
