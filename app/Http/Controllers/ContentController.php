<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Course;
use App\Models\Progresses;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ContentController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Course $course, Topic $topic)
    {
        return Inertia::render('User/Courses/Contents/Create', [
            'topic' => $topic,
            'course' => $course
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['nullable', 'string'],
            'file_path' => ['nullable', 'file', 'max:10240'],
            'external_url' => ['nullable', 'url'],
            'type' => ['required', Rule::in(['material', 'assignment', 'quiz'])],
            'deadline' => ['nullable', 'date', 'after_or_equal:now'],
            'topic_id' => ['required', 'uuid', 'exists:topics,id'],
        ]);

        if ($request->hasFile('file_path')) {
            $validatedData['file_path'] = $request->file('file_path')->store('contents');
        }

        $lastOrder = Content::where('topic_id', $validatedData['topic_id'])->max('order') ?? 0;
        $validatedData['order'] = $lastOrder + 1;

        $content = Content::create($validatedData);

        return response()->json(['content' => $content]);
    }

    public function moveToTop(Content $content)
    {
        Content::where('order', $content->order - 1)->update(['order' => $content->order]);
        $content->update(['order' => $content->order - 1]);

        return response()->json(['message' => 'Content moved to top successfully']);
    }

    public function moveToBottom(Content $content)
    {
        Content::where('order', $content->order + 1)->update(['order' => $content->order]);
        $content->update(['order' => $content->order + 1]);

        return response()->json(['message' => 'Content moved to bottom successfully']);
    }

    public function setProgressDone(Content $content, Request $request)
    {
        Progresses::create([
            'student_id' => $request->user()->id,
            'content_id' => $content->id
        ]);

        return response()->json(['message' => 'Content set to done successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Content $content)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Content $content)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Content $content)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        //
    }
}
