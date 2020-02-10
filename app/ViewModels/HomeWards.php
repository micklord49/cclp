<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class HomeWards extends Model
{
    //

    public $name;
    public $description;
    public $guid;
    public $msg;
    public $news;
    public $menu;

    public function __construct()
    {
        $clpGuid = config('appsettings.clpGUID');
        $clps = DB::select('select * from cclps where guid=?',[$clpGuid]);
        if(count($clps) == 0)
        {
            $this->name = "Unknown CLP";
            $this->description = "Please complete the setup";
            return;
        }

        $this->guid = $clpGuid;
        $this->name = $clps[0]->name;
        $this->description = $clps[0]->description;

        $this->news = new Blogs($clpGuid,6,true,true);

        $this->menu = new Menu($clpGuid);



        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
