<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function index(Request $request): array|object
    {
        $category = Category::query();
        if ($request->has('search')) {
            $category = $category->where('label', 'like', "%{$request->query('search')}%");
        }
        $category = $category->get();


        return $category;
    }
}