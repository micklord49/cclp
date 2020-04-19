<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Branch;
use App\Campaign;
use App\Event;
use App\Social;
use App\ContactList;

use App\ViewModels\Managers\SocialManager;
use App\ViewModels\Managers\BlogManager;
use App\ViewModels\Managers\LinkManager;


class HomeCampaign extends Model
{
    //

    public $msg;
    public $clpname;
    public $guid;
    public $title;
    public $subtitle;
    public $body;
    public $usesubscriptionlist;
    public $subscriptionlist;
    public $useactionlist;
    public $actionlist;
    public $image;
    public $events = array();
    public $nextevent;
    public $by;
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

        $campaign = Campaign::where('guid',$guid)->firstOrFail();
        $this->by = LinkManager::for($campaign->owner);
        $owners = array();

        $this->guid = $guid;
        array_push($owners,$guid);

        $this->title = $campaign->title;
        $this->subtitle = $campaign->subtitle;
        $this->body = $campaign->body;

        $i = new ImageFile($guid);
        if($i->filename != "")
        {
            $this->image = $i->filename;
        }
        else
        {
            $this->image = "/images/defaultcampaign.png";
        }

        $this->useactionlist = $campaign->useactionlist == 1;
        if(($campaign->actionlist ?? '') != '')
        {
            $this->actionlist = ContactList::where('guid',$campaign->actionlist)->first();
        }

        $this->usesubscriptionlist = $campaign->usesubscriptionlist == 1;
        if(($campaign->subscriptionlist ?? '') != '')
        {
            $this->subscriptionlist = ContactList::where('guid',$campaign->subscriptionlist)->first();
        }
        
    
        $this->nextevent = Event::where('owner',$guid)->where('starttime','>',now())->first();


        $this->news = BlogManager::for($guid)->getCards();
        $this->menu = new Menu($clpGuid);

        SocialManager::owner($guid)->addlinks($this);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
