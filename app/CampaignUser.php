<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CampaignUser extends Model
{
    //
    protected $fillable = [
        'guid', 'user', 'campaign', 
    ];


}
