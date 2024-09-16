<?php

namespace App\Http\Controllers;

use App\Models\RecentCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecentCourseController extends Controller
{
    public function getRecent()
    {
        $recentCourses = Auth::user()->recentCourses()->with('course')->get()->map(function ($recentCourse) {
            return $recentCourse->course;
        });

        return response()->json(["courses" => $recentCourses]);
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
