<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\TemporaryFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TemporaryFilesController extends Controller
{
    public function getTempFiles(Content $content)
    {
        $files = TemporaryFiles::where('content_id', $content->id)->where('user_id', Auth::user()->id)->get();
        return response()->json(['files' => $files]);
    }

    public function store(Request $request, Content $content)
    {
        $validatedData =  $request->validate([
            'user_id' => 'required|uuid|exists:users,id',
            'files'   => 'required|array',
            'files.*' => 'required|file|mimes:pdf,docx,zip,jpg,jpeg,png|max:10240',
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('submissions', 'public');
                $originalName = $file->getClientOriginalName();

                TemporaryFiles::create([
                    'user_id' => $validatedData['user_id'],
                    'file_name' => $originalName,
                    'file_path' => $path,
                    'content_id' => $content->id
                ]);
            }
        }

        return response()->json(['message' => 'Files uploaded successfully']);
    }

    public function destroy(Content $content, TemporaryFiles $temporaryFile)
    {
        Storage::disk('public')->delete($temporaryFile->file_path);

        $temporaryFile->delete();

        return response()->json(['message' => 'Files deleted successfully', 'data' => $temporaryFile]);
    }
}
