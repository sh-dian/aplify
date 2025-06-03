<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'location',
        'salary_range',
        'employer_id',
        'is_remote',
        'status',
    ];

    protected $casts = [
        'is_remote' => 'boolean',
    ];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

    public function applicants()
    {
        return $this->belongsToMany(User::class, 'job_applications')->withTimestamps();
    }


}
