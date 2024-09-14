<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('User/Index');
})->name("home");

Route::middleware("auth")->group(function () {
    Route::get('/courses', function () {
        return Inertia::render('User/Courses/Index');
    });

    Route::get('/tasks', function () {
        return Inertia::render('User/Tasks/Index');
    });

    Route::get('/calendar', function () {
        return Inertia::render('User/Calendar/Index');
    });

    Route::get('/library', function () {
        return Inertia::render('User/Library/Index');
    });
});

require __DIR__ . '/auth.php';
