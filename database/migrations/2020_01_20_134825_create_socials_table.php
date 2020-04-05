<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSocialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('socials', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('guid',36);
            $table->string('owner',36);
            $table->string('facebook');
            $table->boolean('facebookfeed');
            $table->string('youtube');
            $table->string('twitter');
            $table->boolean('twitterfeed');
            $table->string('twitterapikey');
            $table->string('twitterapisecret');
            $table->string('twittertokenkey');
            $table->string('twittertokensecret');
            $table->string('instagram');
            $table->string('tumblr');
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
        Schema::dropIfExists('socials');
    }
}
