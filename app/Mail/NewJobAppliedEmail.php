<?php

namespace App\Mail;

use App\Models\ApplicantJob;
use App\Models\Job;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewJobAppliedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $job;

    public function __construct(ApplicantJob $job)
    {
        $this->job = $job;
    }

    public function build()
    {
        return $this->subject('New Application!')
            ->markdown('emails.new-job-applied');
    }
}
