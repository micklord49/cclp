<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    //
    protected $fillable = [
        'owner', 'guid', 
        'facebook', 
        'youtube', 
        'twitter', 'twitterfeed', 'twitterapikey', 'twitterapisecret', 'twittertokenkey', 'twittertokensecret',
        'instagram', 
        'tumblr',
    ];

    protected $attributes = [
        'facebook' => '',
        'youtube' => '',
        'twitter' => '', 'twitterfeed' => '', 'twitterapikey' => '', 'twitterapisecret' => '', 'twittertokenkey' => '', 'twittertokensecret' => '',
        'instagram' => '',
        'tumblr' => '',
        
     ];

}
