<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CarIndexController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/mobil/{car}', [HomeController::class, 'show'])->name('car.show');
Route::get('/howitwork', [HomeController::class, 'howItWorks'])->name('how-it-work');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');

Route::get('/cars', [CarIndexController::class, 'index'])->name('cars.index');

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/booking/{car}', [BookingController::class, 'create'])->name('booking.create');
    Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/booking/{booking}/pay', [BookingController::class, 'pay'])->name('booking.pay');
    Route::patch('/booking/{booking}/cancel', [BookingController::class, 'cancelByUser'])->name('booking.cancel.user');

    Route::get('/my-bookings', [BookingController::class, 'index'])->name('my-bookings');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::patch('/bookings/{booking}/confirm', [DashboardController::class,  'confirm'])->name('booking.confirm');
    Route::patch('/bookings/{booking}/cancel', [DashboardController::class, 'cancel'])->name('booking.cancel');


    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // ... rute lain ...
   Route::resource('cars', \App\Http\Controllers\Admin\CarController::class);
    Route::resource('cars', \App\Http\Controllers\Admin\CarController::class);
    // Bikin rute 'update' manual yang nerima POST dan dikasih nama


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
