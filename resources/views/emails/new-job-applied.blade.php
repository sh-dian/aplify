@component('mail::message')
# New job has been apply!

You have a new job application for the job **{{ $job->job->title }}**.

@component('mail::button', ['url' => config('app.url')])
    Review Application
@endcomponent

Best regards,<br>
{{ config('app.name') }}
@endcomponent
