<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCouncillorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('councillors', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('guid',36);
            $table->string('clp',36);
            $table->string('ward',36);
            $table->string('owner',36);
            $table->string('dn',128);
            $table->string('about');
            $table->boolean('brandAsClp');
            $table->boolean('active');
            $table->boolean('campaign');
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
        Schema::dropIfExists('councillors');
    }
}
