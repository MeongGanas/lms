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
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("teacher_id");
            $table->string("title");
            $table->string("enrollment_key");
            $table->string("image")->nullable();
            $table->timestamps();
        });

        Schema::create('recent_courses', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("student_id");
            $table->foreignUuid("course_id");
            $table->timestamps();
        });

        Schema::create('enrollments', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("student_id");
            $table->foreignUuid("course_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
        Schema::dropIfExists('enrollments');
        Schema::dropIfExists('recent_cources');
    }
};
