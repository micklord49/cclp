<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Spatie\CalendarLinks\Link;

use App\Branch;
use App\Campaign;
use App\Event;
use App\Social;
use App\Councillor;
use App\Council;
use App\Ward;
use App\User;

use App\ViewModels\Managers\SocialManager;
use App\ViewModels\Managers\BlogManager;


class HomeCouncil extends Model
{
    //

    public $msg;
    public $clpname;
    public $guid;
    public $name;
    public $about;
    public $wardlocator;
    public $image;
    public $campaigns = array();
    public $councillors = array();
    public $events = array();
    public $nextevent;
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

        $council = Council::where('guid',$guid)->firstOrFail();
        $owners = array();

        $this->guid = $guid;
        array_push($owners,$guid);

        $this->name = $council->name;
        $this->about = $council->about;
        $this->wardlocator = $council->wardlocator;

        $i = new ImageFile($guid);
        if($i->filename != "")
        {
            $this->image = $i->filename;
        }
        else
        {
            $this->image = "/images/defaultcouncil.png";
        }


        $this->wards = Ward::where('council',$guid)->get();
        foreach($this->wards as $ward)
        {
            $i = new ImageFile($ward->guid);
            if($i->filename=="") {
                $ward->image = "/images/defaultward.png";
            }            
            else  {
                $ward->image = $i->filename;
            }

            $councillors = Councillor::where('ward',$ward->guid)->get();
            foreach($councillors as $councillor)
            {
                array_push($owners,$councillor->guid);
                $c = new class {};
                $usr = User::where('guid',$councillor->owner)->first();
                $c->name = $usr->name;
                $c->guid = $councillor->guid;
                $c->intro = $councillor->intro;
    
                SocialManager::owner($councillor->guid)->addlinks($c);
    
                $i = new ImageFile($c->guid);
                $c->image = $i->filename;
    
                $ward = Ward::where('guid',$councillor->ward)->first();
                $c->ward = $ward->name;
    
                $council = Council::where('guid',$ward->council)->first();
                $c->council = $council->name;
    
                array_push($this->councillors,$c);
            }
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

        
        $this->nextevent = Event::where('owner',$guid)->where('starttime','>',now())->first();
        $this->nexteventlink = "";
        if(isset($this->nextevent->guid))
        {
            $link = Link::create($this->nextevent->title, $this->nextevent->starttime, $this->nextevent->endtime)
                            ->description($this->nextevent->subtitle)
                            ->address($this->nextevent->location);
            $this->nexteventlink = $link->ics();
        }


        $this->news = BlogManager::for($guid)->getCards();
        $this->menu = new Menu($clpGuid);

        SocialManager::owner($guid)->addlinks($this);


        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
