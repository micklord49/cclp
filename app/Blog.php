<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    //
    protected $fillable = [
        'guid', 'owner', 'body', 'status'
    ];

    protected $attributes = [
        'title' => '',
        'body' => '',
        'status' => 'draft',
     ];

}
