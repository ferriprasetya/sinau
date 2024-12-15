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
        Schema::rename('upvote_questions', 'vote_questions');

        Schema::table('vote_questions', function (Blueprint $table) {
            $table->boolean('is_upvote');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('vote_questions', 'upvote_questions');
        Schema::table('vote_questions', function (Blueprint $table) {
            $table->dropColumn('is_upvote');
        });
    }
};
