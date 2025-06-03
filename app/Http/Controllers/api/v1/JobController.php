<?php

namespace App\Http\Controllers\api\v1;

use App\Enums\JobStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Applicant;
use App\Models\ApplicantJob;
use App\Models\Job;
use App\Traits\ApiPaginatorTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    use ApiPaginatorTrait;

    /**
     * Display a listing of all jobs.
     *
     */
    public function allJobs()
    {
        $allJobs = Job::where('status', JobStatusEnum::OPEN())->paginate();
        return $this->return_paginated_api(true, Response::HTTP_OK, null, $allJobs, null, $this->apiPaginator($allJobs));
    }


    /**
     * Apply for a job.
     *
     * @param Request $request
     * @param Job $job
     */
    public function applyJob(Request $request, Job $job)
    {
        $validated = $request->validate([
            'message' => 'required',
        ]);

        // Get the currently authenticated user
        $user = Auth::user();
        $applicant = Applicant::where('user_id', $user->id)->first();

        // Check if user has already applied to this job
        $existingApplication = ApplicantJob::where('job_id', $job->id)
            ->where('applicant_id', $applicant->id)
            ->first();

        if ($existingApplication) {
            return $this->return_api(false, Response::HTTP_BAD_REQUEST, 'You have already applied for this job.', $existingApplication, null, []);
        }

        try {
            // Create a new job application
            $application = new ApplicantJob();
            $application->job_id = $job->id;
            $application->applicant_id = $applicant->id;
            $application->message = $validated['message'];
            $application->save();

            return $this->return_api(true, Response::HTTP_OK, 'Applied Successfully', $application, null);
        } catch (\Exception $e) {
            return $this->return_api(false, Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage(), null, null);
        }
    }

    /**
     * Display a listing of jobs for the authenticated employer.
     */
    public function index()
    {
        $tenantId = Auth::user()->id;
        $jobs = Job::where('employer_id', $tenantId)->orderByDesc('created_at')->paginate();

        return $this->return_paginated_api(true, Response::HTTP_OK, null, $jobs, null, $this->apiPaginator($jobs));
    }

    /**
     * Store a newly created job in storage.
     *
     * @param Request $request
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'salary_range' => 'required|string',
            'is_remote' => 'required|boolean',
            'status' => 'required|in:' . implode(',', JobStatusEnum::toValues()),
        ]);

        $job = new Job();
        $job->employer_id = Auth::user()->id;
        $job->fill($validated);
        $job->save();

        return $this->return_api(true, Response::HTTP_CREATED, 'Job created successfully', $job, null);
    }

    /**
     * Display the specified job.
     *
     * @param Job $job
     */
    public function show(Job $job)
    {
        return $this->return_api(true, Response::HTTP_OK, null, $job, null);
    }

    /**
     * Update the specified job in storage.
     *
     * @param Request $request
     * @param Job $job
     */
    public function update(Request $request, Job $job)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'location' => 'sometimes|required|string|max:255',
            'salary_range' => 'sometimes|required|string',
            'is_remote' => 'sometimes|required|boolean',
            'status' => 'sometimes|required|in:' . implode(',', JobStatusEnum::toValues()),
        ]);

        $job->fill($validated);
        $job->save();

        return $this->return_api(true, Response::HTTP_OK, 'Job updated successfully', $job, null);
    }
}
