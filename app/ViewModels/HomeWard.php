<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Spatie\CalendarLinks\Link;

use App\Ward;
use App\Councillor;
use App\Campaign;
use App\Event;
use App\Social;

use App\ViewModels\Managers\SocialManager;

class HomeWard extends Model
{
    //

    public $msg;
    public $clpname;
    public $guid;
    public $name;
    public $intro;
    public $about;
    public $image;
    public $councillors = array();
    public $campaigns = array();
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

        $ward = Ward::where('guid',$guid)->firstOrFail();
        $owners = array();

        $this->guid = $guid;
        array_push($owners,$guid);

        $this->name = $ward->name;
        $this->intro = $ward->intro;
        $this->about = $ward->about;

        $this->councillors = Councillor::where('ward',$guid)->get();
        foreach($this->councillors as $councillor)
        {
            array_push($owners,$councillor->guid);
            $i = new ImageFile($councillor->guid);
            $councillor->image = $i->filename;

            SocialManager::owner($councillor->guid)->addlinks($councillor);
        }


        $i = new ImageFile($guid);
        if($i->filename != "")
        {
            $this->image = $i->filename;
        }
        else
        {
            $this->image = "/images/defaultward.png";
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
        if(isset($this->nextevent))
        {
            if($this->nextevent->guid != "")
            {
                $link = Link::create($this->nextevent->title, $this->nextevent->starttime, $this->nextevent->endtime)
                                ->description($this->nextevent->subtitle)
                                ->address($this->nextevent->location);
                $this->nexteventlink = $link->ics();
            }
        }


        $this->news = new Blogs($guid,6,true,true);
        $this->menu = new Menu($clpGuid);

        SocialManager::owner($guid)->addlinks($this);


        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
