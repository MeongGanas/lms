<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Course extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });

        static::addGlobalScope('withTeacherAndEnrollment', function ($query) {
            $query->with(['teacher', 'enrollments']);
        });
    }

    protected $keyType = 'string';
    public $incrementing = false;

    protected $guarded = ['id'];

    public function recentCourse()
    {
        return $this->hasMany(RecentCourse::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class);
    }
}
