<?php

namespace App\Services;

use App\Models\Question;
use Gemini\Data\Blob;
use Gemini\Enums\MimeType;
use Gemini\Laravel\Facades\Gemini;

class GeminiService
{
    /**
     * Generate answer
     */
    public function generateAnswer(Question $question, string|null $image): string
    {
        $prompt = "Anda ditugaskan menjadi bot penjawab pertanyaan pada suatu forum diskusi pelajar. ";
        $education = $question->education()->get()->first()->label;

        // starter prompt by its education
        if ($education) {
            $prompt .= "Anda akan menjawab pertanyaan {$education}. ";
        }

        // insert the question
        $prompt .= " Jawaban pertanyaan berikut ini: {$question->title}. ";
        if ($question->content != null) {
            $prompt .= " Berikut penjelasan tambahan untuk pertanyaan diatas: {$question->content}. ";
        }

        // add categories to improve accuration of answer
        $categories = $question->categories()->get();
        if ($categories) {
            $prompt .= " Untuk mempermudah anda menjawabnya, berikut kategori dari pernyataan tersebut (tidak perlu menyebutkan kategori lagi di jawaban): ";
            foreach ($categories as $category) {
                $prompt .= "{$category->label}, ";
            }
        }


        // language
        $prompt .= " Untuk mempermudah, gunakan bahasa sesuai dengan bahasa pertanyaan. ";

        // additional instruction
        $prompt .= " harap jawab pertanyaan berikut dengan maksimal kurang lebih 200 kata dan dalam satu paragraf, jawab langsung pada inti jawabannya. apabila pertanyaan tersebut tergolong mudah, jawab dengan jawaban singkat dan mudah dimengerti";

        // handle image

        if ($image) {
            $prompt .= " Berikut gambar yang dapat membantu anda menjawab pertanyaan diatas.";

            $media = new Blob(
                mimeType: MimeType::IMAGE_JPEG,
                data: base64_encode(
                    file_get_contents($image)
                )
            );

            // generate the answer with image
            $answer = Gemini::geminiFlash()->generateContent([
                $prompt,
                $media
            ])->text();
            return $answer;
        }

        // generate the answer
        $answer = Gemini::geminiFlash()->generateContent($prompt)->text();
        return $answer;
    }
}
