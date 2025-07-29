<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('brand'); // Merek: Koenigsegg, Porsche
            $table->string('model'); // Tipe/Model: Jesko, 911 GT3
            $table->string('category'); // Kategori: Sport, SUV, Sedan
            $table->year('year'); // Tahun: 2023
            $table->bigInteger('price_per_day'); // Harga: 3500000 (dalam angka)
            $table->string('color');
            $table->string('transmission'); // manual, matic
            $table->string('fuel_type'); // Bensin Pertamax, Diesel
            $table->integer('seating_capacity');
            $table->string('engine_specification'); // 2.9L (2,994 cc) 6-Silinder
            $table->json('features')->nullable(); // Untuk "Fitur Unggulan"
            $table->string('image_url')->nullable(); // Link ke gambar utama mobil
            $table->string('status')->default('available'); // available, rented
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
