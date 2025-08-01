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
}
