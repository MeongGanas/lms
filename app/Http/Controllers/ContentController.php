<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Progresses;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    use AuthorizesRequests;

    public function getContents(string $topic_id)
    {
        $contents = Content::where('topic_id', $topic_id)->orderBy('order')->get();
        return response()->json(['contents' => $contents]);
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

    /**
     * Show the form for creating a new resource.
     */
    public function create(Topic $topic)
    {
        return Inertia::render('User/Courses/Contents/Create', [
            'topic' => $topic,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Content::class);

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['nullable', 'string'],
            'external_url' => ['nullable', 'url'],
            'type' => ['required', Rule::in(['material', 'assignment', 'quiz'])],
            'deadline' => ['nullable', 'date', 'after_or_equal:now'],
            'topic_id' => ['required', 'uuid', 'exists:topics,id'],
            'course_id' => ['required', 'uuid', 'exists:courses,id'],
        ]);

        if ($request->hasFile('file_path')) {
            $validatedData['file_path'] = $request->file('file_path')->store('contents');
        }

        $lastOrder = Content::where('topic_id', $validatedData['topic_id'])->max('order') ?? 0;
        $validatedData['order'] = $lastOrder + 1;

        Content::create($validatedData);

        return response()->json(['message' => 'Content created successfully']);
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
     * Show the form for editing the specified resource.
     */
    public function edit(Topic $topic, Content $content)
    {
        return Inertia::render('User/Courses/Contents/Edit', [
            'content' => $content,
            'topic' => $topic
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Content $content)
    {
        $this->authorize('update', $content);

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['nullable', 'string'],
            'external_url' => ['nullable', 'url'],
            'type' => ['required', Rule::in(['material', 'assignment', 'quiz'])],
            'deadline' => ['nullable', 'date', 'after_or_equal:now'],
        ]);

        if ($content->file_path) {
            Storage::delete($content->file_path);
        }

        if ($request->hasFile('file_path')) {
            $validatedData['file_path'] = $request->file('file_path')->store('contents', 'public');
        }

        $content->update($validatedData);

        return response()->json(['message' => 'Content updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        $this->authorize("delete", $content);

        if ($content->file_path) {
            Storage::delete($content->file_path);
        }

        $content->delete();
        return response()->json(['message' => 'Content deleted successfuly']);
    }
}
