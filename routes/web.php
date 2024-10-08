<?php

use App\Http\Controllers\TasksController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('User/Index');
})->name("home");

Route::middleware("auth")->group(function () {
    Route::resource('/tasks', TasksController::class);

    Route::get('/calendar', function () {
        return Inertia::render('User/Calendar/Index');
    });

    Route::get('/library', function () {
        return Inertia::render('User/Library/Index');
    });
});

require __DIR__ . '/auth.php';
require __DIR__ . '/course.php';
