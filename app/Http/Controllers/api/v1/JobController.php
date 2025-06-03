<?php

namespace App\Http\Controllers\api\v1;

use App\Enums\JobStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\ApplicantJobResource;
use App\Http\Resources\JobResource;
use App\Mail\NewJobAppliedEmail;
use App\Models\Applicant;
use App\Models\ApplicantJob;
use App\Models\Job;
use App\Traits\ApiPaginatorTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class JobController extends Controller
{
    use ApiPaginatorTrait;

    /**
     * Display a listing of all jobs.
     *
     */
    public function allJobs(Request $request)
    {
        $latest = $request->input('latest');
        $search = $request->input('search');

        $query = Job::where('status', JobStatusEnum::OPEN());

        if ($latest) {
            // Get start of the current week (e.g., Monday)
            $startOfWeek = Carbon::now()->startOfWeek();
            $query->where('created_at', '>=', $startOfWeek);
        }

        if ($search) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $query->orderByDesc('created_at');

        $allJobs = $query->paginate(6);

        return $this->return_paginated_api(
            true,
            Response::HTTP_OK,
            null,
            JobResource::collection($allJobs),
            null,
            $this->apiPaginator($allJobs)
        );
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
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        // Get the currently authenticated user
        $user = Auth::user();
        $applicant = Applicant::where('user_id', $user->id)->first();

        // Check if user has already applied to this job
        $existingApplication = ApplicantJob::where('job_id', $job->id)
            ->where('applicant_id', $applicant->id)
            ->first();

        if ($existingApplication) {
            return $this->return_api(false, Response::HTTP_BAD_REQUEST, 'You have already applied for this job.', ApplicantJobResource::make($existingApplication), null, []);
        }

        try {
            // Handle resume file upload
            if ($request->hasFile('resume') && $request->file('resume')->isValid()) {
                // Store the resume in the 'resumes' directory on the default disk (e.g., public or S3)
                $resumePath = $request->file('resume')->store('resumes', 'public');
            } else {
                throw new \Exception('Invalid resume file.');
            }

            // Create a new job application
            $application = new ApplicantJob();
            $application->job_id = $job->id;
            $application->applicant_id = $applicant->id;
            $application->message = $validated['message'];
            $applicant->resume_path = $resumePath;
            $application->save();
            $applicant->save();

            Mail::to($application->job->employer->user->email)->send(new NewJobAppliedEmail($application));
            return $this->return_api(true, Response::HTTP_OK, 'Applied Successfully', ApplicantJobResource::make($application), null);
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

        return $this->return_paginated_api(true, Response::HTTP_OK, null, JobResource::collection($jobs), null, $this->apiPaginator($jobs));
    }

    /**
     * Store a newly created job in storage.
     *
     * @param Request $request
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'location' => 'required|string|max:255',
                'salary_range' => 'required|string',
                'is_remote' => 'required|boolean',
                'status' => 'required|in:' . implode(',', JobStatusEnum::toValues()),
            ], [
                'title.required' => 'The job title is required.',
                'description.required' => 'The job description is required.',
                'location.required' => 'The job location is required.',
                'salary_range.required' => 'The salary range is required.',
                'is_remote.required' => 'The remote status is required.',
                'status.in' => 'The job status must be one of: ' . implode(', ', JobStatusEnum::toValues()),
            ]);

            $job = new Job();
            $job->employer_id = Auth::user()->id;
            $job->fill($validated);
            $job->save();

            return $this->return_api(true, Response::HTTP_CREATED, 'Job created successfully', JobResource::make($job), null);
        } catch (\Exception $e) {
            return $this->return_api(false, Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage(), null, null);
        }
    }

    /**
     * Display the specified job.
     *
     * @param Job $job
     */
    public function show(Job $job)
    {
        $authUser = Auth::user();

        if ($authUser->hasRole('Employer')) {
            if ($job->employer_id !== $authUser->id) {
                return $this->return_api(false, Response::HTTP_FORBIDDEN, 'You are not authorized to view other employer job.', null, null);
            }
        }
        return $this->return_api(true, Response::HTTP_OK, null, JobResource::make($job), null);
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

        return $this->return_api(true, Response::HTTP_OK, 'Job updated successfully', JobResource::make($job), null);
    }

    /**
     * Remove the specified job from storage.
     *
     * @param Job $job
     */
    public function destroy(Job $job)
    {
        if ($job->employer_id !== Auth::user()->id) {
            return $this->return_api(false, Response::HTTP_FORBIDDEN, 'You are not authorized to delete this job.', null, null);
        }

        $job->delete();
        return $this->return_api(true, Response::HTTP_OK, 'Job deleted successfully', null, null);
    }
}
