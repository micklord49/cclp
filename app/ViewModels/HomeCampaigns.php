<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;


use App\Branch;
use App\Councillor;
use App\Campaign;
use App\Event;
use App\Social;

use App\ViewModels\ImageFile;
use App\ViewModels\Blogs;



class HomeCampaigns extends Model
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

        $owners = array();
        array_push($owners,$clpGuid);

        $branches = Branch::where('clp',$clpGuid)->get();
        foreach($branches as $branch)
        {
            array_push($owners,$branch->guid);
        }

        $councillors = Councillor::where('clp',$clpGuid)->get();
        foreach($councillors as $councillor)
        {
            array_push($owners,$councillor->guid);
        }


        $campaigns = Campaign::whereIn('owner',$owners)->get();
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
    
        $this->menu = new Menu($clpGuid);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
