<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('User/Index');
})->name("home");

Route::get('/mycourses', function () {
    return Inertia::render('User/Courses');
});

require __DIR__ . '/auth.php';
