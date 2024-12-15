<?php

namespace App\Services;

use App\Models\Education;
use Illuminate\Http\Request;

class EducationService
{
    public function index(Request $request): array|object
    {
        $educations = Education::query();
        if ($request->has('search')) {
            $educations = $educations->where('label', 'like', "%{$request->query('search')}%");
        }

        $educations = $educations->get();

        return $educations;
    }
}
