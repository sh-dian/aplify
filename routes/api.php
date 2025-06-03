<?php

use App\Http\Controllers\api\v1\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\JobController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/jobs', [JobController::class, 'allJobs']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('employer')->middleware('role:Employer')->group(function () {
        Route::resource('/jobs', JobController::class);
    });

    Route::prefix('applicant')->middleware('role:Applicant')->group(function () {
        Route::post('/apply-job/{job}', [JobController::class, 'applyJob']);
    });

    Route::get('/jobs/{job}', [JobController::class, 'show']);
    Route::get('/user', [AuthController::class, 'user']);

});

