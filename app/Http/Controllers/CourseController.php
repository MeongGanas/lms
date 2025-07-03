<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CourseController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        return Inertia::render('User/Courses/Index');
    }

    public function getAll()
    {
        $courses = Course::with(['teacher', 'enrollments'])->get();
        return response()->json(["courses" => $courses]);
    }

    public function searchCourse(Request $request)
    {
        $courses = Course::where('title', 'like', '%' . $request->query('query') . '%')->get();
        return response()->json(["courses" => $courses]);
    }

    public function store(Request $request)
    {
        $this->authorize("create", Course::class);

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

        $breadcrumbs = [
            ['title' => 'Courses', 'url' => route('courses.index')],
            ['title' => $course->title, 'url' => route('courses.show', $course)],
        ];

        return Inertia::render("User/Courses/Detail", [
            "course" => $course->only("id", "title", "teacher_id"),
            'breadcrumbs' => $breadcrumbs,
        ]);
    }

    public function getEnrollments(Course $course)
    {
        return response()->json(['participants' => $course->enrollments()->with('student')->get()]);
    }

    public function enrollView(Course $course)
    {
        try {
            $this->authorize("enrollView", $course);
        } catch (AuthorizationException $e) {
            return redirect('/courses/' . $course->id);
        }

        return Inertia::render("User/Courses/Enroll", [
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

    public function kickParticipant(Course $course, Enrollment $enrollment)
    {
        $this->authorize("update", $course);

        $enrollment->delete();
        return response()->json(["message" => 'Kicking ' . $enrollment->student->name . ' successfuly']);
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
