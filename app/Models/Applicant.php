<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    use HasFactory;

    protected $table = 'applicants';
    protected $fillable = ['user_id', 'resume_path'];

    /**
     * Get the user that owns the applicant.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
