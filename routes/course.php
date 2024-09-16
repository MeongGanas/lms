<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\RecentCourseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('User/Index');
})->name("home");

Route::middleware("auth")->group(function () {
    Route::get('/getAllCourses', [CourseController::class, 'getAll']);

    Route::get('/getRecentCourses', [RecentCourseController::class, 'getRecent']);
    Route::post('/setRecentCourse', [RecentCourseController::class, 'store']);

    Route::get('/courses', [CourseController::class, 'index'])->name("courses");
    Route::get('/courses/{course}', [CourseController::class, 'show']);

    Route::middleware("isTeacher")->group(function () {
        Route::post('/courses/create', [CourseController::class, 'store']);
    });

    Route::middleware("isStudent")->group(function () {
        Route::get('/courses/{course}/join', [CourseController::class, 'joinView']);
        Route::post('/courses/{course}/join', [CourseController::class, 'join']);
    });
});
