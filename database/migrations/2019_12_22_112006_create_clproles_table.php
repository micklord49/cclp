<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClprolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clproles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('clp',36);                 
            $table->string('guid',36);                 
            $table->string('description',36);
            $table->integer('mandatory');
            $table->integer('clpdefined');
            $table->integer('sortorder');
            $table->string('help');
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
        Schema::dropIfExists('clproles');
    }
}
