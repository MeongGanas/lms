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
    Route::prefix('student')->group(function () {
        // course fetch
        Route::get('/getRecentCourses', [RecentCourseController::class, 'getRecentStudentCourses']);
    });

    Route::prefix('teacher')->group(function () {
        // course fetch
        Route::get('/getRecentCourses', [RecentCourseController::class, 'getRecentTeacherCourses']);
    });

    Route::get('/getAllCourses', [CourseController::class, 'getAll']);
    Route::post('/setRecentCourse', [RecentCourseController::class, 'store']);

    Route::get('/courses', [CourseController::class, 'index'])->name("courses");
    Route::get('/courses/{course}', [CourseController::class, 'show']);

    // teacher actions
    Route::post('/courses/create', [CourseController::class, 'store']);

    // topics
    Route::get('/courses/{course_id}/topics', [TopicController::class, 'getTopics']);
    Route::post('/topic/create ', [TopicController::class, 'store']);
    Route::delete('/topics/{topic}/delete', [TopicController::class, 'destroy']);

    // contents
    Route::get('/topics/{topic_id}/contents', [ContentController::class, 'getContents']);
    Route::get('/courses/{course_id}/topics/{topic}/contents/create', [ContentController::class, 'create']);
    Route::post('/content/create', [ContentController::class, 'store']);
    Route::delete('/contents/{content}/delete', [ContentController::class, 'destroy']);


    Route::put('/contents/{content}/move-to-top', [ContentController::class, 'moveToTop']);
    Route::put('/contents/{content}/move-to-bottom', [ContentController::class, 'moveToBottom']);

    Route::put('/contents/{content}/set-progress-done', [ContentController::class, 'setProgressDone']);

    // enrollment
    Route::get('/courses/{course}/enroll', [CourseController::class, 'enrollView']);
    Route::post('/courses/{course}/enroll', [CourseController::class, 'enroll']);

    // search
    Route::get('/course/search', [CourseController::class, 'searchCourse']);
});
