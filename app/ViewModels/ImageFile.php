<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

use App\Image;

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

    public static function Filename($guid)
    {
        $images = Image::where('guid',$guid)->get();
        if(count($images) == 0)
        {
            return "";
        }

        return "app/".$images[0]->path;
    }


    public function __construct($owner)
    {
        $clpGuid = config('appsettings.clpGUID');
        Log::debug("Retreiving image for owner ".$owner);
        $images = Image::where('owner',$owner)->get();
        if(count($images) == 0)
        {
            Log::debug("No record found ");
            $this->filename = "";
            $this->guid = "";
            return;
        }

        $this->filename = "/".str_replace("images","image",$images[0]->path);
        $this->guid = "/".str_replace("images","image",$images[0]->guid);
     }
}
