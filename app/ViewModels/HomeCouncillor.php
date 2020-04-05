<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Councillor;
use App\User;
use App\Branch;
use App\Ward;

use App\ViewModels\Managers\SocialManager;

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

        $this->clpguid = $clpGuid;
        $this->clpname = $clps[0]->name;
        $this->analytics = $clps[0]->analytics;

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

        $this->branch = Branch::where('guid',$councillor->branch)->first();
        if(isset($this->branch))
        {
            $i = new ImageFile($councillor->branch);
            if($i->filename != "")
            {
                $this->branch->image = $i->filename;
            }
            else
            {
                $this->branch->image = "/images/block-branch.png";
            }
        }


        $this->ward = Ward::where('guid',$councillor->ward)->first();
        $i = new ImageFile($councillor->ward);
        if($i->filename != "")
        {
            $this->ward->image = $i->filename;
        }
        else
        {
            $this->ward->image = "/images/block-ward.png";
        }

        $this->news = new Blogs($guid,6,true,true);
        $this->menu = new Menu($clpGuid);

        SocialManager::owner($guid)->addlinks($this);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
