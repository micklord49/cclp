<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Councillor;
use App\Campaign;
use App\User;
use App\Branch;
use App\Ward;

use App\ViewModels\Managers\SocialManager;
use App\ViewModels\Managers\BlogManager;

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
    public $imageguid;
    public $news;
    public $campaigns;
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
        $this->imageguid = $i->guid;
        if($i->filename != "")
        {
            $this->image = $i->filename;
        }
        else
        {
            $this->image = "/images/block-council.png";
        }

        $branch = Branch::where('guid',$councillor->branch)->first();
        $this->branch = new \stdClass();
        $this->branch->branch = $branch->name . " Branch";
        $this->branch->guid = $branch->guid;
        SocialManager::owner($branch->guid)->addlinks($this->branch);
        if(isset($this->branch))
        {
            $i = new ImageFile($councillor->branch);
            if($i->filename != "")
            {
                $this->branch->image = $i->filename;
            }
            else
            {
                $this->branch->image = "/images/defaultbranch.png";
            }
        }


        $this->ward = Ward::where('guid',$councillor->ward)->first();
        $this->ward->name .= " Ward";
        $i = new ImageFile($councillor->ward);
        if($i->filename != "")
        {
            $this->ward->image = $i->filename;
        }
        else
        {
            $this->ward->image = "/images/defaultward.png";
        }


        $this->campaigns = array();
        $campaigns = Campaign::where('owner',$guid)->get();
        foreach($campaigns as $campaign)
        {
            $c = new class {};
            $c->title = $campaign->title;
            $c->subtitle = $campaign->subtitle;
            $c->guid = $campaign->guid;
            SocialManager::owner($campaign->guid)->addlinks($c);

            $i = new ImageFile($c->guid);
            if($i->filename=="") {
                $c->image = "/images/defaultcampaign.png";
            }
            else  {
                $c->image = $i->filename;
            }

            array_push($this->campaigns,$c);
        }

        
        $this->news = BlogManager::for($guid)->getCards();
        $this->menu = new Menu($clpGuid);

        SocialManager::owner($guid)->addlinks($this);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
