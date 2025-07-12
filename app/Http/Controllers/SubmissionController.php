<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Submission;
use App\Models\SubmissionFiles;
use App\Models\TemporaryFiles;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'files.*.file_path' => 'required|string|exists:temporary_files,file_path',
        ]);

        $submission = Submission::create([
            'student_id' => $validatedData['user_id'],
            'content_id' => $content->id
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
