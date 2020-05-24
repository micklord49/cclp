<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SurveyResponseItem extends Model
{
    //
    public $incrementing = false;
    protected $primaryKey = 'guid';
    protected $keyType = 'string';

}
