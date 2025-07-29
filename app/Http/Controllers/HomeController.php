<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // <-- Import Inertia
use App\Models\Car;   // <-- Import model Car

class HomeController extends Controller
{
    public function index()
    {
        // 1. Ambil semua data mobil dari database
        $cars = Car::all();

        // 2. Render komponen React 'Welcome' dan kirim data 'cars' sebagai props
        return Inertia::render('welcome', [
            'cars' => $cars,
            'canLogin' => \Illuminate\Support\Facades\Route::has('login'), // <-- kirim props bawaan breeze
            'canRegister' => \Illuminate\Support\Facades\Route::has('register'),
        ]);
    }
}
