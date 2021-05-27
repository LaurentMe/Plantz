<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlantUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plant_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('plant_id');
            $table->unsignedBigInteger('user_id');
            $table->string('location')->nullable();
            $table->string('nickname')->nullable();
            $table->longblob('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plant_user');
    }
}
