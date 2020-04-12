<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;


use App\Branch;
use App\Campaign;
use App\Event;
use App\Social;

use App\ViewModels\ImageFile;
use App\ViewModels\Managers\BlogManager;
use App\ViewModels\Managers\SocialManager;



class HomeBranches extends Model
{
    //

    public $msg;
    public $branches = array();
    public $campaigns = array();
    public $events = array();
    public $news;
    public $menu;

    public function __construct()
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


        $branches = Branch::where('clp',$clpGuid)->get();
        $owners = array();

        foreach($branches as $branch)
        {
            $b = new \stdClass();
            $b->branch = $branch->name;
            $b->guid = $branch->guid;
            array_push($owners,$branch->guid);

            SocialManager::owner($branch->guid)->addlinks($this->branch);

            $i = new ImageFile($b->guid);
            if($i->filename=="") {
                $b->image = "/images/defaultbranch.png";
            }            
            else  {
                $b->image = $i->filename;
            }

            array_push($this->branches,$b);
        }

        $campaigns = Campaign::whereIn('owner',$owners)->get();
        foreach($campaigns as $campaign)
        {
            $c = new class {};
            $c->title = $campaign->title;
            $c->subtitle = $campaign->subtitle;
            $c->guid = $campaign->guid;
            array_push($owners,$campaign->guid);

            $social = Social::where('owner',$campaign->guid)->first();
            if($social != null)
            {
                $c->facebook = strtolower($social->facebook);                
                if(substr($c->facebook,0,4) != "http")
                {
                    $c->facebook = "https://".$c->facebook;
                }
            }

            $i = new ImageFile($c->guid);
            if($i->filename=="") {
                $c->image = "/images/defaultcampaign.png";
            }            
            else  {
                $c->image = $i->filename;
            }

            array_push($this->campaigns,$c);
        }
    
        $this->news = BlogManager::forBranches($clpGuid)->getCards();
        $this->menu = new Menu($clpGuid);



        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
