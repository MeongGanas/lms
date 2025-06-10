<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use PharIo\Manifest\Author;

class CourseController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        return Inertia::render('User/Courses/Index');
    }

    public function getAll()
    {
        $courses = Course::all();
        return response()->json(["courses" => $courses]);
    }

    public function getMyCorses()
    {
        $courses = Auth::user()->courses;
        return response()->json(["courses" => $courses]);
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
        try {
            $this->authorize("view", $course);
        } catch (AuthorizationException $e) {
            return redirect('/courses/' . $course->id . '/enroll');
        }

        return Inertia::render("User/Courses/Detail", [
            "course" => $course
        ]);
    }

    public function enrollView(Course $course)
    {
        try {
            $this->authorize("enrollView", $course);
        } catch (AuthorizationException $e) {
            return redirect('/courses/' . $course->id);
        }

        return Inertia::render("User/Courses/enroll", [
            "course" => $course
        ]);
    }

    public function enroll(Course $course, Request $request)
    {
        $enrollment = Enrollment::firstOrCreate([
            'course_id' => $course->id,
            'student_id' => $request->user()->id,
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
