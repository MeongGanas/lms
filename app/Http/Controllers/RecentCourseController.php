<?php

namespace App\Http\Controllers;

use App\Models\RecentCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecentCourseController extends Controller
{
    public function getRecentTeacherCourses()
    {
        $teacher = \App\Models\User::find(Auth::id());

        $recentCourses = $teacher->recentCourses()
            ->with(['course', 'course.enrollments'])
            ->get()
            ->map(fn($rc) => $rc->course)
            ->filter();

        return response()->json(['courses' => $recentCourses]);
    }

    public function getRecentStudentCourses()
    {
        $student = \App\Models\User::find(Auth::id());

        $recentCourses = $student->recentCourses()
            ->with([
                'course.teacher',
                'course.contents' => function ($query) use ($student) {
                    $query->with([
                        'progresses' => fn($q) => $q->where('student_id', $student->id)
                    ]);
                }
            ])
            ->get()
            ->map(function ($rc) use ($student) {
                $course = $rc->course;

                $allContents = $course->topics->flatMap->contents;
                $total = $allContents->count();

                $done = $allContents->filter(function ($content) use ($student) {
                    return $content->progresses->where('student_id', $student->id)->isNotEmpty();
                })->count();

                $progressPercentage = $total > 0 ? round(($done / $total) * 100) : 0;

                $course->progress_percentage = $progressPercentage;

                return [
                    'id' => $course->id,
                    'teacher_id' => $course->teacher_id,
                    'title' => $course->title,
                    'image' => $course->image,
                    'teacher' => [
                        'firstname' => $course->teacher->firstname,
                        'lastname' => $course->teacher->lastname,
                    ],
                    'progress_percentage' => $progressPercentage,
                ];
            });

        return response()->json(['courses' => $recentCourses]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(["course_id" => "required|string|min:36|max:36"]);

        $recent = RecentCourse::updateOrCreate(
            [
                "user_id" => Auth::user()->id,
                "course_id" => $request->course_id,
            ],
            [
                "updated_at" => now(),
            ]
        );

        return response()->json(["recent" => $recent]);
    }

    /**
     * Display the specified resource.
     */
    public function show(RecentCourse $recentCourse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RecentCourse $recentCourse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RecentCourse $recentCourse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RecentCourse $recentCourse)
    {
        //
    }
}
