<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'firstname' => 'Admin',
            'phone_number' => '1234',
            'password' => '1234',
            'role' => 'admin',
            'email' => 'admin@gmail.com',
        ]);

        User::create([
            'firstname' => 'Teacher',
            'phone_number' => '1432',
            'password' => '1234',
            'role' => 'teacher',
            'email' => 'teacher@gmail.com',
        ]);

        User::create([
            'firstname' => 'Student',
            'phone_number' => '4321',
            'password' => '1234',
            'email' => 'student@gmail.com',
        ]);
    }
}
