<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Candidate;
use App\Campaign;
use App\User;
use App\Branch;
use App\Ward;

use App\ViewModels\Managers\SocialManager;
use App\ViewModels\Managers\BlogManager;

class HomeCandidate extends Model
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

        $candidate = Candidate::where('clp',$clpGuid)->firstOrFail();
        $user = User::where('guid',$candidate->owner) ->firstOrFail();
        $this->guid = $candidate->guid;

        $this->name = $user->name;
        $this->intro = $candidate->intro;
        $this->about = $candidate->about;

        $i = new ImageFile($candidate->guid);
        $this->imageguid = $i->guid;
        if($i->filename != "")
        {
            $this->image = $i->filename;
        }
        else
        {
            $this->image = "/images/block-candidate.png";
        }


        $this->campaigns = array();
        $campaigns = Campaign::where('owner',$candidate->guid)->get();
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

        
        $this->news = BlogManager::for($candidate->guid)->getCards();
        $this->menu = new Menu($clpGuid);

        SocialManager::owner($candidate->guid)->addlinks($this);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
