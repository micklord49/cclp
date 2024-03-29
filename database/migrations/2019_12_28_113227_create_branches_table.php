<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBranchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branches', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('guid',36);
            $table->string('clp',36);
            $table->string('name');
            $table->string('intro');
            $table->longText('about');
            $table->string('ecofficer',36);
            $table->string('email');
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
        Schema::dropIfExists('branches');
    }
}
