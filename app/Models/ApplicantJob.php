<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantJob extends Model
{
    use HasFactory;

    protected $table = 'applicant_jobs';
    protected $fillable = ['applicant_id', 'job_id', 'status'];

    /**
     * Get the applicant that owns the job application.
     */
    public function applicant()
    {
        return $this->belongsTo(Applicant::class);
    }

    /**
     * Get the job that the applicant applied for.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
