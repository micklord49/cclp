<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCouncillorAdministratorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('councillor_administrators', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('guid',36);
            $table->string('councillor',36);
            $table->string('user',36);
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
        Schema::dropIfExists('councillor_administrators');
    }
}
