<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Courses/Index');
    }

    public function getAll()
    {
        $user = Auth::user()->courses;
        return response()->json(["courses" => $user]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|min:2|max:255",
            "enrollment_key" => "required|min:2|max:255"
        ]);

        $newCourse = Course::create([
            "title" => $request->title,
            "enrollment_key" => $request->enrollment_key,
            "teacher_id" => $request->user()->id
        ]);

        return response()->json(["course" => $newCourse]);
    }

    public function show(Course $course)
    {
        return Inertia::render("User/Courses/Detail", [
            "course" => $course
        ]);
    }

    public function joinView(Course $course)
    {
        return Inertia::render("User/Courses/Join", [
            "course" => $course
        ]);
    }

    public function join(Course $course, Request $request)
    {
        $enrollment = Enrollment::create([
            "course_id" => $course->id,
            "student_id" => $request->user()->id,
        ]);

        return response()->json(["enrollment" => $enrollment]);
    }

    public function edit(Course $course)
    {
        //
    }

    public function update(Request $request, Course $course)
    {
        //
    }

    public function destroy(Course $course)
    {
        //
    }
}
