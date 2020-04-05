<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('guid',36);
            $table->string('owner',36);
            $table->string('title');
            $table->text('subtitle');
            $table->longText('body');
            $table->boolean('useactionlist');
            $table->string('actionlist',36);
            $table->boolean('showcampaign');
            $table->string('campaign',36);
            $table->text('status');
            $table->boolean('totwitter');
            $table->boolean('tofacebook');
            $table->integer('priority');
            $table->datetime('publishedOn')->nullable();
            $table->boolean('publishNow');
            $table->datetime('publishFrom')->nullable();
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
        Schema::dropIfExists('blogs');
    }
}
