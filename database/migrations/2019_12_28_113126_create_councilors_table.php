<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCouncilorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('councilors', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('guid',36);
            $table->string('clp',36);
            $table->string('ward');
            $table->string('user',36);
            $table->string('dn',128);
            $table->boolean('brandAsClp');
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
        Schema::dropIfExists('councilors');
    }
}
