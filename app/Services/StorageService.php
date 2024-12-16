<?php

namespace App\Services;

use App\Http\Requests\Question\CreateQuestionRequest;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StorageService
{
    public function storeQuestionImage(CreateQuestionRequest $request, Question $question)
    {
        try {
            $image = $request->image_url;

            // Extract MIME type from the base64 string
            preg_match('/^data:image\/(.*?);base64,/', $image, $matches);
            $extension = $matches[1];

            $base64Content = str_replace("data:image/{$extension};base64,", '', $image);

            $decodedImage = base64_decode($base64Content);

            if ($decodedImage === false) {
                return response()->json(['error' => 'Gambar tidak valid.'], 400);
            }

            $filename = "{$question->slug}_image.{$extension}";
            Storage::disk('gcs')->put($filename, $decodedImage);

            $url = Storage::disk('gcs')->url($filename);
            return $url;
        } catch (\Exception $e) {
            dd($e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
