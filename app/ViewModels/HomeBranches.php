<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;


use App\Branch;
use App\Campaign;
use App\Event;
use App\Social;

use App\ViewModels\ImageFile;
use App\ViewModels\Blogs;



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

        $this->guid = $clpGuid;

        $branches = Branch::where('clp',$clpGuid)->get();
        $owners = array();

        foreach($branches as $branch)
        {
            $b = new class {};
            $b->branch = $branch->name;
            $b->guid = $branch->guid;
            array_push($owners,$branch->guid);

            $social = Social::where('owner',$branch->guid)->first();
            if($social != null)
            {
                $b->facebook = strtolower($social->facebook);                
                if(substr($b->facebook,0,4) != "http")
                {
                    $b->facebook = "https://".$b->facebook;
                }
            }

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
    
        $this->news = new Blogs($clpGuid,6,false,true,"BRC");

        $this->menu = new Menu($clpGuid);



        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
