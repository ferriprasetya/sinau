<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\QuestionService;
use Illuminate\Http\Request;

class QuestionApiController extends Controller
{

    public function __construct(
        protected QuestionService $questionService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // return $this->questionService->getListQuestion($request);

        $questions = $this->questionService->getListQuestion($request);
        return response()->json([
            'message' => __('questions.index.success'),
            ...$questions
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
