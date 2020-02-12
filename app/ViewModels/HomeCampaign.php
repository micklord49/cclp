<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Branch;
use App\Campaign;
use App\Event;
use App\Social;


class HomeCampaign extends Model
{
    //

    public $msg;
    public $clpname;
    public $guid;
    public $title;
    public $subtitle;
    public $body;
    public $image;
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

        $this->clpname = $clps[0]->name;

        $campaign = Campaign::where('guid',$guid)->firstOrFail();
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
    
        $this->nextevent = Event::where('owner',$guid)->where('starttime','>',now())->first();


        $this->news = new Blogs($guid,6,true,true);
        $this->menu = new Menu($clpGuid);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
