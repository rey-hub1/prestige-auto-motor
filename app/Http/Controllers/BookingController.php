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
                'end_date' => 'required|date|after_or_equal:start_date',
                'start_date' => [
                    'required',
                    'date',
                    'after_or_equal:today',
                    // Costum double checcking func
                    function ($attribute, $value, $fail) use ($request) {

                        $car = Car::find($request->car_id);
                        if(!$car){
                            return;
                        }
                        $BookedCount = Booking::where('car_id', $request->car_id)
                            ->where(function ($query) use ($request) {
                                $query->where(function ($q) use ($request) {
                                    $q->where('start_date', '<=', $request->start_date)
                                        ->where('end_date', '>=', $request->start_date);
                                })->orWhere(function ($q) use ($request) {
                                    $q->where('start_date', '<=', $request->end_date)
                                        ->where('end_date', '>=', $request->end_date);
                                })->orWhere(function ($q) use ($request) {
                                    $q->where('start_date', '>=', $request->start_date)
                                        ->where('end_date', '<=', $request->end_date);
                                });
                            })
                            ->count();
                        if ($BookedCount >= $car->stock) {
                            $fail('Mobil tidak tersedia pada rentang tanggal yang dipilih.');
                        }
                    }
                ],
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

    public function pay(Request $request, Booking $booking)
    {
        if ($request->user()->id !== $booking->user_id) {
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

    public function cancelByUser(Request $request, Booking $booking)
    {
        // Kemaanan: memastikan yang mau batalin yang punya nya
        if ($request->user()->id !== $booking->user_id){
            abort(403, 'UNAUTHORIZED ACTION');
        }

        //  check mastiin cuma pending yang bisa di batalin
        if($booking->status !== 'pending'){
            // Kalo udah di confirm, ga bisa di  batalin
            return to_route('my-bookings')->with('error', 'Booking yang sudah di konfirmasi tidak bisa di batalakan');
        }

        $booking->update(['status' => 'cancelled']);

        return to_route('my-bookings')->with('massage', 'Booking berhasil dibatalkan.');


    }
}
