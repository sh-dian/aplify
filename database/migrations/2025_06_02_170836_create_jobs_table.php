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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained('employers')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->string('salary_range')->nullable(); // Format example: "4000-6000"
            $table->boolean('is_remote')->default(false);
            $table->enum('status', \App\Enums\JobStatusEnum::toValues())->default(\App\Enums\JobStatusEnum::OPEN());
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
