<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TopicController extends Controller
{
    use AuthorizesRequests;

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize("create", Topic::class);

        $validatedData = $request->validate([
            'title' => 'required|string|min:2|max:255',
            'course_id' => 'required|uuid|exists:courses,id'
        ]);

        $lastOrder = Topic::where('course_id', $validatedData['course_id'])->max('order') ?? 0;
        $validatedData['order'] = $lastOrder + 1;

        Topic::create($validatedData);

        return response()->json(['message' => 'Topic created successfully']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Topic $topic)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        //
    }
}
