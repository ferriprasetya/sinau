<?php

namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $educations = [
            ['label' => 'SD'],
            ['label' => 'SMP'],
            ['label' => 'SMA'],
            ['label' => 'Kuliah'],
            ['label' => 'Umum']
        ];

        foreach ($educations as $education) {
            Education::create($education);
        }
    }
}
