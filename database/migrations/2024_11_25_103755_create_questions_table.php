<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('education_id')->nullable()->constrained('educations')->nullOnDelete();
            $table->string('title')->unique();
            $table->string('slug')->unique();
            $table->integer('upvote')->default(0);
            $table->integer('downvote')->default(0);
            $table->string('image_url')->nullable();
            $table->text('content')->nullable();
            $table->boolean('is_correct')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
