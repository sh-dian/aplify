<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Applicant;
use App\Models\Employer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call the RolesAndPermissionsSeeder to set up roles and permissions
        $this->call(RolePermissionSeeder::class);

        // Create an Employer user
        $employer = User::create([
            'name' => 'Test Employer',
            'email' => 'employer@example.com',
            'password' => bcrypt('password123'),
        ]);
        $employer->assignRole('Employer');
        Employer::create([
            'user_id' => $employer->id,
            'company_name' => 'Test Company Inc.',
        ]);

        // Create an Applicant user
        $applicant = User::create([
            'name' => 'Test Applicant',
            'email' => 'applicant@example.com',
            'password' => bcrypt('password123'),
        ]);
        $applicant->assignRole('Applicant');
        Applicant::create([
            'user_id' => $applicant->id,
        ]);

        $this->call(JobSeeder::class);
    }
}
