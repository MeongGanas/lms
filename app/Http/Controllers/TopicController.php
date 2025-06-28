<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TopicController extends Controller
{
    use AuthorizesRequests;

    public function getTopics(string $course)
    {
        $topics = Topic::where('course_id', $course)->orderBy('order')->get();
        return response()->json(['topics' => $topics]);
    }

    public function moveToTop(Course $course, Topic $topic)
    {
        $this->authorize('update', $course);

        Topic::where('order', $topic->order - 1)->update(['order' => $topic->order]);
        $topic->update(['order' => $topic->order - 1]);

        return response()->json(['message' => 'Topic moved to top successfully']);
    }

    public function moveToBottom(Course $course, Topic $topic)
    {
        $this->authorize('update', $course);

        Topic::where('order', $topic->order + 1)->update(['order' => $topic->order]);
        $topic->update(['order' => $topic->order + 1]);

        return response()->json(['message' => 'Topic moved to bottom successfully']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Course $course)
    {
        $this->authorize("update", $course);

        $validatedData = $request->validate([
            'title' => 'required|string|min:2|max:255|unique:topics,title',
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
    public function update(Request $request, Course $course, Topic $topic)
    {
        $this->authorize("update", $course);

        $validatedData = $request->validate([
            'title' => 'required|string|min:2|max:255|unique:topics,title',
        ]);

        $topic->update($validatedData);

        return response()->json(['message' => 'Topic updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course, Topic $topic)
    {
        $this->authorize("delete", $course);

        $topic->delete();

        return response()->json(['message' => 'Topic deleted successfuly']);
    }
}
