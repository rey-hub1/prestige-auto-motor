<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class BookingController extends Controller
{

    public function index()
    {
        $bookings = \App\Models\Booking::query()
            ->where('user_id', Auth::id())
            ->with('car')
            ->latest()
            ->get();
        return Inertia::render('User/MyBookings', [
            'bookings' => $bookings
        ]);;
    }
    public function create(Car $car)
    {
        return Inertia::render('Booking/Create', [
            'car' => $car,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([

                'car_id' => 'required|exists:cars,id',
                'start_date' => 'required|date|after_or_equal:today',
                'end_date' => 'required|date|after:start_date',
            ]);
        } catch (ValidationException $e) {
            dd($e->errors());
        }

        $car = Car::findOrFail($request->car_id);

        // Hitung Selisih Hari
        $startDate = new \DateTime($request->start_date);
        $endDate = new \DateTime($request->end_date);
        $days = $endDate->diff($startDate)->days;

        Booking::create([
            'user_id' => $request->user()->id,
            'car_id' => $request->car_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => $days * $car->price_per_day,
            'status' => 'pending',
        ]);

        return to_route('admin.dashboard')->with('message', 'Booling berhasil');
    }

    public function pay(Request $request, Booking $booking) {
        if($request->user()->id !== $booking->user_id){
            abort(403, 'UNAUTHORIZED ACTION');
        }

        $booking->update(['status' => 'success']);

        $car = $booking->car;
        $message = sprintf(
            "Halo Admin,\n\nSaya ingin konfirmasi pembayaran untuk booking:\nID Booking: *#%s*\nMobil: *%s %s*\nTotal: *Rp %s*\n\nTerima kasih.",
            $booking->id,
            $car->brand,
            $car->model,
            number_format($booking->total_price, 0, ',', '.')
        );

        $whatsappUrl = 'https://wa.me/' . env('ADMIN_WHATSAPP_NUMBER') . '?text=' . urlencode($message);

        return redirect()->away($whatsappUrl);
    }
}
