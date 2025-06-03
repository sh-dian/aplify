@component('mail::message')
# Welcome to Aplify, {{ $user->name }}!

Thank you for registering with Aplify. We're excited to have you on board!

@if($user->getRoleAttribute() === 'Employer')
You can now start posting jobs and finding the best talent for your company.
@else
You can now start exploring job opportunities and applying to positions.
@endif

@component('mail::button', ['url' => config('app.url')])
Get Started
@endcomponent

Best regards,<br>
{{ config('app.name') }}
@endcomponent
