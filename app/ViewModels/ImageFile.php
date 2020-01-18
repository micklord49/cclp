<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Clprole;

class ImageFile extends Model
{
    //

    public $filename;
    public $guid;
    public $canchange = false;
    public $canedit = false;


    protected $appends = ['filename','guid', 'canchange', 'canedit'];


    public function getfilenameAttribute()
    {
        return $this->filename;
    }
    public function getguidAttribute()
    {
        return $this->guid;
    }
    public function getcanchangeAttribute()
    {
        return $this->canchange;
    }
    public function getcaneditAttribute()
    {
        return $this->canedit;
    }


    public function __construct($owner)
    {
        $clpGuid = config('appsettings.clpGUID');
        $clps = DB::select('select * from images where owner=?',[$owner]);
        if(count($clps) == 0)
        {
            $this->filename = "";
            $this->guid = "";
            return;
        }

        $this->filename = $clps[0]->filename;
    }



}
