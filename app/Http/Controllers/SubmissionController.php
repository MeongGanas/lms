<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Enrollment;
use App\Models\Submission;
use App\Models\SubmissionFiles;
use App\Models\TemporaryFiles;
use App\Models\User;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    public function getAllSubmissions(Content $content)
    {
        $submissions = Submission::where('content_id', $content->id)->with(['files', 'student'])->get();
        return response()->json(['submissions' => $submissions]);
    }

    public function getNotSubmitters(Content $content)
    {
        $enrolledUserIds = $content->course->enrollments()->pluck('student_id');

        $notSubmitters = User::whereIn('id', $enrolledUserIds)
            ->whereDoesntHave('submissions', function ($query) use ($content) {
                $query->where('content_id', $content->id);
            })
            ->get();

        return response()->json(['not_submitters' => $notSubmitters]);
    }

    public function getUserSubmission(Content $content, String $user_id)
    {
        $user = User::findOrFail($user_id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $submission = Submission::where('content_id', $content->id)->where('student_id', $user_id)->with('files')->get();
        return response()->json(['submission' => $submission]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Content $content)
    {
        $validatedData =  $request->validate([
            'user_id' => 'required|uuid|exists:users,id',
            'files'   => 'required|array',
            'files.*.id' => 'required|uuid|exists:temporary_files,id',
            'files.*.file_name' => 'required|string|exists:temporary_files,file_name',
            'files.*.file_path' => 'required|string|
            exists:temporary_files,file_path',
        ]);

        $deadline = $content->deadline;
        $status = $deadline->isPast() ? 'late' : 'on_time';

        $submission = Submission::create([
            'student_id' => $validatedData['user_id'],
            'content_id' => $content->id,
            'status' => $status
        ]);

        foreach ($validatedData['files'] as $file) {
            SubmissionFiles::create([
                'submission_id' => $submission->id,
                'file_name' => $file['file_name'],
                'file_path' => $file['file_path'],
            ]);

            TemporaryFiles::where('id', $file['id'])->delete();
        }

        return response()->json(['message' => 'Files submitted successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Submission $submission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Submission $submission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Submission $submission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Submission $submission)
    {
        //
    }
}
