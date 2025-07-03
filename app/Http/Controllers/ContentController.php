<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Course;
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

    public function getContents(string $_, string $topic_id)
    {
        $contents = Content::where('topic_id', $topic_id)->orderBy('order')->get();
        return response()->json(['contents' => $contents]);
    }

    public function moveToTop(Course $course, Content $content)
    {
        $this->authorize('update', $course);

        Content::where('order', $content->order - 1)->update(['order' => $content->order]);
        $content->update(['order' => $content->order - 1]);

        return response()->json(['message' => 'Content moved to top successfully']);
    }

    public function moveToBottom(Course $course, Content $content)
    {
        $this->authorize('update', $course);

        Content::where('order', $content->order + 1)->update(['order' => $content->order]);
        $content->update(['order' => $content->order + 1]);

        return response()->json(['message' => 'Content moved to bottom successfully']);
    }

    public function setProgressDone(Course $course, Content $content, Request $request)
    {
        $this->authorize('view', $course);

        Progresses::create([
            'student_id' => $request->user()->id,
            'content_id' => $content->id
        ]);

        return response()->json(['message' => 'Content set to done successfully']);
    }

    public function show(Course $course, Topic $topic, Content $content)
    {
        $this->authorize('view', $course);

        $breadcrumbs = [
            ['title' => 'Courses', 'url' => route('courses.index')],
            ['title' => $course->title, 'url' => route('courses.show', $course)],
            ['title' => 'Topics', 'url' => route('courses.show', $course)],
            ['title' => $topic->title, 'url' => '#'],
            ['title' => 'Contents', 'url' => '#'],
            ['title' => $content->title, 'url' => '#'],
        ];

        return Inertia::render('User/Courses/Contents/Detail', [
            'content' => $content,
            'breadcrumbs' => $breadcrumbs,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Course $course, Topic $topic)
    {
        $this->authorize('update', $course);

        $breadcrumbs = [
            ['title' => 'Courses', 'url' => route('courses.index')],
            ['title' => $course->title, 'url' => route('courses.show', $course)],
            ['title' => 'Topics', 'url' => route('courses.show', $course)],
            ['title' => $topic->title, 'url' => '#'],
            ['title' => 'Contents', 'url' => '#'],
            ['title' => 'Create', 'url' => '#'],
        ];

        return Inertia::render('User/Courses/Contents/Create', [
            'topic' => $topic,
            'breadcrumbs' => $breadcrumbs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Course $course)
    {
        $this->authorize('update', $course);

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['nullable', 'string'],
            'external_url' => ['nullable', 'url'],
            'type' => ['required', Rule::in(['material', 'assignment', 'quiz'])],
            'deadline' => ['nullable', 'date'],
            'topic_id' => ['required', 'uuid', 'exists:topics,id'],
        ]);

        $validatedData['course_id'] = $course->id;

        if ($request->hasFile('file_path')) {
            $validatedData['file_path'] = $request->file('file_path')->store('contents');
        }

        $lastOrder = Content::where('topic_id', $validatedData['topic_id'])->max('order') ?? 0;
        $validatedData['order'] = $lastOrder + 1;

        Content::create($validatedData);

        return response()->json(['message' => 'Content created successfully']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course, Topic $topic, Content $content)
    {
        $this->authorize('update', $course);

        $breadcrumbs = [
            ['title' => 'Courses', 'url' => route('courses.index')],
            ['title' => $course->title, 'url' => route('courses.show', $course)],
            ['title' => 'Topics', 'url' => route('courses.show', $course)],
            ['title' => $topic->title, 'url' => '#'],
            ['title' => 'Contents', 'url' => '#'],
            ['title' => $content->title, 'url' => '#'],
            ['title' => 'Edit', 'url' => '#'],
        ];

        return Inertia::render('User/Courses/Contents/Edit', [
            'content' => $content,
            'topic' => $topic,
            'breadcrumbs' => $breadcrumbs
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course, Content $content)
    {
        $this->authorize('update', $course);

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['nullable', 'string'],
            'external_url' => ['nullable', 'url'],
            'type' => ['required', Rule::in(['material', 'assignment', 'quiz'])],
            'deadline' => ['nullable', 'date'],
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
    public function destroy(Course $course, Content $content)
    {
        $this->authorize("delete", $course);

        if ($content->file_path) {
            Storage::delete($content->file_path);
        }

        $content->delete();
        return response()->json(['message' => 'Content deleted successfuly']);
    }
}
