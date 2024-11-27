<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['label' => 'Pemrograman'],
            ['label' => 'Sejarah'],
            ['label' => 'Matematika'],
            ['label' => 'Fisika'],
            ['label' => 'Kimia'],
            ['label' => 'Biologi'],
            ['label' => 'Bahasa Indonesia'],
            ['label' => 'Bahasa Inggris'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
