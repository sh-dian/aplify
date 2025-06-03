<?php

namespace Database\Seeders;

use App\Models\Employer;
use Faker\Factory as Faker;
use App\Enums\JobStatusEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $employerId = Employer::pluck('id')->first();

        if (!$employerId) {
            throw new \Exception('No employer records found. Please seed at least one employer first.');
        }

        $jobs = [
            [
                'employer_id' => $employerId,
                'title' => 'Senior Software Engineer',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '8000-10000',
                'is_remote' => true,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subDay(),
                'updated_at' => now()->subDay(),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Product Manager',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '6000-8000',
                'is_remote' => false,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subMonth(),
                'updated_at' => now()->subMonth(),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'UX Designer',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '5000-7000',
                'is_remote' => true,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subMonth(),
                'updated_at' => now()->subMonth(),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Data Analyst',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '4000-6000',
                'is_remote' => false,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subMonths(6),
                'updated_at' => now()->subMonths(6),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'DevOps Engineer',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '7000-9000',
                'is_remote' => true,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subMonths(6),
                'updated_at' => now()->subMonths(6),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'QA Tester',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '4000-5000',
                'is_remote' => false,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(10),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Business Analyst',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '5000-7000',
                'is_remote' => true,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subWeeks(3),
                'updated_at' => now()->subWeeks(3),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'System Administrator',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '4500-6000',
                'is_remote' => false,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subMonths(2),
                'updated_at' => now()->subMonths(2),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Cloud Architect',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '9000-12000',
                'is_remote' => true,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subDays(40),
                'updated_at' => now()->subDays(40),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Mobile App Developer',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '6000-8500',
                'is_remote' => true,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subMonths(4),
                'updated_at' => now()->subMonths(4),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Security Analyst',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '6500-9000',
                'is_remote' => false,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subMonths(3),
                'updated_at' => now()->subMonths(3),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Technical Writer',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '4000-6000',
                'is_remote' => true,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subWeeks(6),
                'updated_at' => now()->subWeeks(6),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'AI Engineer',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '10000-13000',
                'is_remote' => true,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subDays(20),
                'updated_at' => now()->subDays(20),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'Blockchain Developer',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '11000-14000',
                'is_remote' => true,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subMonths(5),
                'updated_at' => now()->subMonths(5),
            ],
            [
                'employer_id' => $employerId,
                'title' => 'IT Support Specialist',
                'description' => $faker->paragraph(3),
                'location' => $faker->city(),
                'salary_range' => '3500-5000',
                'is_remote' => false,
                'status' => JobStatusEnum::OPEN(),
                'created_at' => now()->subDays(50),
                'updated_at' => now()->subDays(50),
            ],
        ];

        DB::table('jobs')->insert($jobs);
    }
}
