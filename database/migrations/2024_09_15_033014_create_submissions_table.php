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
        Schema::create('submissions', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("content_id")->index()->constrained()->cascadeOnDelete();
            $table->foreignUuid("student_id")->index()->constrained("users", "id")->cascadeOnDelete();
            $table->string("file_path");
            $table->boolean("sended")->default(true);
            $table->integer("score")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
