<?php

namespace App\Policies;

use App\Models\Content;
use App\Models\Course;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ContentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Content $content): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        $courseId = request()->input('course_id');

        if (! $courseId) {
            return false;
        }

        return Course::where('id', $courseId)
            ->where('teacher_id', $user->id)
            ->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Content $content): bool
    {
        return Course::where('id', $content->course_id)
            ->where('teacher_id', $user->id)
            ->exists();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Content $content): bool
    {
        return Course::where('id', $content->course_id)
            ->where('teacher_id', $user->id)
            ->exists();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Content $content): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Content $content): bool
    {
        return false;
    }
}
