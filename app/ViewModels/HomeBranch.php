<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Spatie\CalendarLinks\Link;

use App\Branch;
use App\BranchAdministrator;
use App\Campaign;
use App\Event;
use App\Social;
use App\Councillor;
use App\Council;
use App\Ward;
use App\User;

use App\ViewModels\Managers\SocialManager;
use App\ViewModels\Managers\BlogManager;


class HomeBranch extends Model
{
    //

    public $msg;
    public $clpname;
    public $guid;
    public $name;
    public $intro;
    public $about;
    public $image;
    public $campaigns = array();
    public $councillors = array();
    public $roles = array();
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

        $branch = Branch::where('guid',$guid)->firstOrFail();
        $owners = array();

        $this->guid = $guid;
        array_push($owners,$guid);

        $this->name = $branch->name;
        $this->intro = $branch->intro;
        $this->about = $branch->about;

        $i = new ImageFile($guid);
        if($i->filename != "")
        {
            $this->image = $i->filename;
        }
        else
        {
            $this->image = "/images/defaultbranch.png";
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

        
        $councillors = Councillor::where('branch',$guid)->get();
        foreach($councillors as $councillor)
        {
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


        $roles = BranchAdministrator::where('branch',$guid)->where('type','!=','admin')->get();
        foreach($roles as $role)
        {
            $roleview = new \stdClass();
            $roleview->guid = $role->user;
            switch($role->type)
            {
                case 'chair':
                    $roleview->description = 'Chair' ;
                    break;
                case 'secretary':
                    $roleview->description = 'Seretary';
                    break;
                default:
                    $roleview->description = 'EC Representative';
                    break;
            }
            $u = User::where('guid',$role->user)->first();
            $roleview->name = $u->name;
            $i = new ImageFile($role->user);
            if($i->filename=="") {
                $roleview->image = "/images/defaultuser.png";
            }
            else  {
                $roleview->image = $i->filename;
            }

            array_push($this->roles,$roleview);
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
