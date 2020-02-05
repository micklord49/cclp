<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Councillor;
use App\User;


class HomeCouncillor extends Model
{
    //

    public $msg;
    public $clpname;
    public $guid;
    public $name;
    public $intro;
    public $about;
    public $image;
    public $news;
    public $menu;

    public function __construct($guid)
    {
        $clpGuid = config('appsettings.clpGUID');
        $clps = DB::select('select * from cclps where guid=?',[$clpGuid]);
        if(count($clps) == 0)
        {
            return;
        }

        $this->clpname = $clps[0]->name;

        $councillor = Councillor::where('guid',$guid)->firstOrFail();
        $user = User::where('guid',$councillor->owner) ->firstOrFail();
        $this->guid = $guid;

        $this->name = $user->name;
        $this->intro = $councillor->intro;
        $this->about = $councillor->about;

        $i = new ImageFile($guid);
        if($i->filename != "")
        {
            $this->image = $i->filename;
        }
        else
        {
            $this->image = "/images/block-council.png";
        }

        $this->news = new Blogs($guid,6,true,true);
        $this->menu = new Menu($clpGuid);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
