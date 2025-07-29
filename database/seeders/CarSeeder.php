<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        Car::create([
            'brand' => 'Koenigsegg',
            'model' => 'Jesko',
            'category' => 'Sport',
            'year' => 2023,
            'price_per_day' => 3500000,
            'color' => 'Hitam Metalik',
            'transmission' => 'Otomatis (CVT)',
            'fuel_type' => 'Bensin Pertamax',
            'seating_capacity' => 2,
            'engine_specification' => '5.0L Twin-Turbo V8',
            'features' => json_encode(['Captain Seats', 'Full Leather Seats', 'Sunroof & Moonroof', 'Ambient Cabin Lighting']),
            'image_url' => 'https://example.com/jesko.png', // ganti dengan link gambar nanti
        ]);

        Car::create([
            'brand' => 'Lamborghini',
            'model' => 'Aventador',
            'category' => 'Sport',
            'year' => 2022,
            'price_per_day' => 4200000,
            'color' => 'Kuning',
            'transmission' => 'Otomatis',
            'fuel_type' => 'Bensin Pertamax Turbo',
            'seating_capacity' => 2,
            'engine_specification' => '6.5L V12',
            'features' => json_encode(['Scissor Doors', 'Carbon Fiber Interior', 'Premium Audio System']),
            'image_url' => 'https://example.com/aventador.png',
        ]);
    }
}
