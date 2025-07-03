<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Content extends Model
{
    /** @use HasFactory<\Database\Factories\ContentFactory> */
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });

        static::addGlobalScope('withProgresses', function ($query) {
            $query->with(['progresses']);
        });
    }

    protected $casts = [
        'deadline' => 'datetime',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $guarded = ['id'];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function progresses()
    {
        return $this->hasMany(Progresses::class);
    }

    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
