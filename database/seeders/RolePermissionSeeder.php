<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Permissions for Employer
        $permissionsEmployer = [
            'create jobs',
            'edit jobs',
            'delete jobs',
            'view own jobs',
            'view applicants for jobs',
        ];

        // Create Permissions for Applicant
        $permissionsApplicant = [
            'browse jobs',
            'apply to jobs',
        ];

        // Create permissions in the database
        foreach ($permissionsEmployer as $permission) {
            Permission::create(['name' => $permission]);
        }

        foreach ($permissionsApplicant as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create Employer role and assign permissions
        $employerRole = Role::create(['name' => 'Employer']);
        $employerRole->givePermissionTo($permissionsEmployer);

        // Create Applicant role and assign permissions
        $applicantRole = Role::create(['name' => 'Applicant']);
        $applicantRole->givePermissionTo($permissionsApplicant);
    }
}
