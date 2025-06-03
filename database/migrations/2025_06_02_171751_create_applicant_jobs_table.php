<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applicant_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained('jobs')->onDelete('cascade');
            $table->foreignId('applicant_id')->constrained('applicants')->onDelete('cascade'); // applicant
            $table->enum('status', \App\Enums\JobStatusEnum::toValues())->default(\App\Enums\JobStatusEnum::PENDING());
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['job_id', 'applicant_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_jobs');
    }
};
