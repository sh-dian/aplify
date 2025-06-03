<?php

namespace Database\Seeders;

use App\Models\Employer;
use Faker\Factory as Faker;
use App\Enums\JobStatusEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        // Fetch a single employer ID (assuming at least one exists)
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
        ];

        DB::table('jobs')->insert($jobs);
    }
}
