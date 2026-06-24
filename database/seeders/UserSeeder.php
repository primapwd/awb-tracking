<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = env('ADMIN_PASSWORD');

        if (app()->environment('production') && empty($password)) {
            throw new \RuntimeException('ADMIN_PASSWORD env var is required in production. Set it before seeding.');
        }

        User::create([
            'name' => 'Admin',
            'email' => env('ADMIN_EMAIL', 'admin@awb.local'),
            'password' => bcrypt($password ?: 'password'),
            'email_verified_at' => now(),
        ]);
    }
}
