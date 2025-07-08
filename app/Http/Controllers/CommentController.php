<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Content;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function getComments(Content $content)
    {
        $comments = $content->comments;
        return response()->json(['comments' => $comments]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Content $content)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|uuid|exists:users,id',
            'body' => 'required|string',
        ]);

        if ($request->has('parent_id')) {
            $request->validate([
                'parent_id' => 'required|uuid|exists:comments,id',
            ]);
            $validatedData['parent_id'] = $request->parent_id;
        }

        $validatedData['content_id'] = $content->id;

        Comment::create($validatedData);

        return response()->json(['message' => 'Comment created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
