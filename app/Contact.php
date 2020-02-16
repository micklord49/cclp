<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Contact extends Model
{
    use Notifiable;


    protected $fillable = [
        'name', 'email', 'email_verified_at', 'address1', 'address2', 'city'
    ];

}
