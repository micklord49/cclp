<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CandidateAdministrator extends Model
{
    protected $fillable = [
        'candidate', 'guid', 'user',
    ];
}
