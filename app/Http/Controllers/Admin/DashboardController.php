<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $bookings = Booking::with(['user', 'car'])->latest()->get();

        return Inertia::render('Admin/Dashboard', [
            'bookings' => $bookings,
        ]);
    }

    public function confirm(Booking $booking)
    {
        $booking->update(['status' => 'waiting_payment']);

        return to_route('admin.dashboard');
    }

    public function cancel(Request $request, Booking $booking) {
        $request->validate([
            'cancellation_reason' => 'required|string|min:5',
        ]);

        $booking->update([
            'status' => "cancelled",
            'cancellation_reason' => $request->cancellation_reason,
        ]);

        return to_route('admin.dashboard');
    }


}
