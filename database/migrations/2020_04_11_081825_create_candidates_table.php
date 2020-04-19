<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('guid',36);
            $table->string('clp',36);
            $table->string('owner',36);
            $table->string('dn');
            $table->string('email');
            $table->text('intro');
            $table->longText('about');
            $table->boolean('brandAsClp');
            $table->boolean('active');
            $table->boolean('campaign');
            $table->boolean('usesubscriptionlist');
            $table->string('subscriptionlist',36);
            $table->boolean('useactionlist');
            $table->string('actionlist',36);
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
        Schema::dropIfExists('candidates');
    }
}
