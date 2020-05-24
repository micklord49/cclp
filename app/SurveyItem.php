<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SurveyItem extends Model
{
    //
    public $incrementing = false;
    protected $primaryKey = 'guid';
    protected $keyType = 'string';
}
