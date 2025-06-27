<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TopicController extends Controller
{
    use AuthorizesRequests;

    public function getTopics(string $course_id)
    {
        $topics = Topic::where('course_id', $course_id)->orderBy('order')->get();
        return response()->json(['topics' => $topics]);
    }

    public function moveToTop(Topic $topic)
    {
        Topic::where('order', $topic->order - 1)->update(['order' => $topic->order]);
        $topic->update(['order' => $topic->order - 1]);

        return response()->json(['message' => 'Topic moved to top successfully']);
    }

    public function moveToBottom(Topic $topic)
    {
        Topic::where('order', $topic->order + 1)->update(['order' => $topic->order]);
        $topic->update(['order' => $topic->order + 1]);

        return response()->json(['message' => 'Topic moved to bottom successfully']);
    }

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
        $this->authorize("update", $topic);

        $validatedData = $request->validate([
            'title' => 'required|string|min:2|max:255',
        ]);

        $topic->update($validatedData);

        return response()->json(['message' => 'Topic updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        $this->authorize("delete", $topic);

        $topic->delete();

        return response()->json(['message' => 'Topic deleted successfuly']);
    }
}
