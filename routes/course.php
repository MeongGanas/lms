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

    Route::get('/courses', [CourseController::class, 'index'])->name("courses.index");
    Route::get('/courses/{course}', [CourseController::class, 'show'])->name("courses.show");

    // teacher actions
    Route::post('/courses/create', [CourseController::class, 'store']);

    Route::prefix('/courses/{course}')->group(function () {
        // enrollment
        Route::get('/enroll', [CourseController::class, 'enrollView']);
        Route::post('/enroll', [CourseController::class, 'enroll']);

        // topics
        Route::get('/topics', [TopicController::class, 'getTopics']);
        Route::post('/topic/create ', [TopicController::class, 'store']);
        Route::put('/topics/{topic}/edit ', [TopicController::class, 'update']);
        Route::delete('/topics/{topic}/delete', [TopicController::class, 'destroy']);

        Route::put('/topics/{topic}/move-to-top', [TopicController::class, 'moveToTop']);
        Route::put('/topics/{topic}/move-to-bottom', [TopicController::class, 'moveToBottom']);

        // contents
        Route::get('/topics/{topic_id}/contents', [ContentController::class, 'getContents']);
        Route::get('/topics/{topic}/contents/create', [ContentController::class, 'create']);
        Route::post('/content/create', [ContentController::class, 'store']);

        Route::get('/topics/{topic}/contents/{content}/edit', [ContentController::class, 'edit']);
        Route::put('/contents/{content}/edit', [ContentController::class, 'update']);
        Route::delete('/contents/{content}/delete', [ContentController::class, 'destroy']);

        Route::put('/contents/{content}/set-progress-done', [ContentController::class, 'setProgressDone']);
        Route::put('/contents/{content}/move-to-top', [ContentController::class, 'moveToTop']);
    });

    // contents
    Route::put('/contents/{content}/move-to-bottom', [ContentController::class, 'moveToBottom']);

    // search
    Route::get('/course/search', [CourseController::class, 'searchCourse']);
});
