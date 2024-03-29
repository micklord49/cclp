<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCclpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cclps', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('guid',36);
            $table->string('name',128);
            $table->longText('description');
            $table->longText('specialheadline');
            $table->string('analytics',48);
            $table->string('dn');
            $table->string('email');
            $table->string('phone');

            $table->boolean('groupCouncillorsByWard');

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
        Schema::dropIfExists('cclps');
    }
}
