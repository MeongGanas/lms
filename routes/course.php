<?php

use App\Http\Controllers\ContentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\RecentCourseController;
use App\Http\Controllers\TopicController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('User/Index');
})->name("home");

Route::middleware("auth")->group(function () {
    // course fetch
    Route::get('/getAllCourses', [CourseController::class, 'getAll']);
    Route::get('/getRecentCourses', [RecentCourseController::class, 'getRecent']);
    Route::post('/setRecentCourse', [RecentCourseController::class, 'store']);

    Route::get('/courses', [CourseController::class, 'index'])->name("courses");
    Route::get('/courses/{course}', [CourseController::class, 'show']);

    // teacher actions
    Route::post('/courses/create', [CourseController::class, 'store']);

    // topics
    Route::post('/course/topics/create ', [TopicController::class, 'store']);

    // contents
    Route::get('/courses/{course}/topics/{topic}/contents/create', [ContentController::class, 'create']);
    Route::post('/courses/{course}/topics/{topic}/contents/create', [ContentController::class, 'store']);

    // enrollment
    Route::get('/courses/{course}/enroll', [CourseController::class, 'enrollView']);
    Route::post('/courses/{course}/enroll', [CourseController::class, 'enroll']);

    // search
    Route::get('/course/search', [CourseController::class, 'searchCourse']);
});
