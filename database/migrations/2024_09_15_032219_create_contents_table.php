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
        Schema::create('topics', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("course_id")->index()->constrained()->cascadeOnDelete();
            $table->string("title")->unique();
            $table->integer("order");
            $table->timestamps();
        });

        Schema::create('contents', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("course_id")->index()->constrained()->cascadeOnDelete();
            $table->foreignUuid("topic_id")->index()->constrained()->cascadeOnDelete();
            $table->string("title");
            $table->string("file_path")->nullable();
            $table->enum("type", ['material', 'assignment', 'quiz'])->default('material');
            $table->integer("order");
            $table->dateTime('deadline')->nullable();
            $table->timestamps();
        });

        Schema::create('progresses', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("content_id")->index()->constrained()->cascadeOnDelete();
            $table->foreignUuid("user_id")->index()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contents');
        Schema::dropIfExists('topics');
        Schema::dropIfExists('progresses');
    }
};
