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
            'password' => '1234',
            'role' => 'admin',
            'email' => 'admin@gmail.com',
        ]);

        User::create([
            'firstname' => 'Teacher',
            'password' => '1234',
            'role' => 'teacher',
            'email' => 'teacher@gmail.com',
        ]);
        User::create([
            'firstname' => 'Teacher 2',
            'password' => '1234',
            'role' => 'teacher',
            'email' => 'teacher2@gmail.com',
        ]);

        User::create([
            'firstname' => 'Student1',
            'password' => '1234',
            'email' => 'student@gmail.com',
        ]);

        User::create([
            'firstname' => 'Student2',
            'password' => '1234',
            'email' => 'student2@gmail.com',
        ]);

        User::create([
            'firstname' => 'Student3',
            'password' => '1234',
            'email' => 'student3@gmail.com',
        ]);
    }
}
