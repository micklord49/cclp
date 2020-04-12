<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Message;
use App\Campaign;
use App\Branch;
use App\Ward;
use App\Councillor;
use App\CouncillorAdministrator;
use App\Council;
use App\Candidate;
use App\CandidateAdministrator;
use App\BranchAdministrator;
use App\Blog;
use App\Visit;
use Carbon\Carbon;

use App\ViewModels\Managers\SocialManager;


class Dashboard extends Model
{
    //

    public $name;
    public $description;
    public $guid;
    public $msg;
    public $boards;
    public $menu;

    public function __construct()
    {
        $clpGuid = config('appsettings.clpGUID');
        $clps = DB::select('select * from cclps where guid=?',[$clpGuid]);
        if(count($clps) == 0)
        {
            $this->name = "Unknown CLP";
            $this->description = "Please complete the setup";
            return;
        }

        $this->guid = $clpGuid;
        $this->name = $clps[0]->name;
        $this->description = $clps[0]->description;

        $this->boards = array();

        if(auth()->user()->can('Edit CLP'))
        {
            array_push($this->boards,$this->StatsForOwner($this->guid,$this->name,"/clp","/"));
        }

        $user = auth()->user();

        $cb = "";
        
        $councillor = Councillor::where('owner',$user->guid)->count();
        if($councillor>0)
        {
            $councillor = Councillor::where('owner',$user->guid)->first();
            $ward = Ward::where('guid',$councillor->ward)->first();
            array_push($this->boards,$this->StatsForOwner($ward->council,"My Council's Page","/councillor","/council/".$ward->council));
            array_push($this->boards,$this->StatsForOwner($councillor->guid,"My info as a Councillor","/councillor","/councillor/".$councillor->guid));
            $cb = $councillor->branch;                        
        }
        $candidate = Candidate::where('owner',$user->guid)->count();
        if($candidate>0)
        {
            $candidate = Candidate::where('owner',$user->guid)->first();
            array_push($this->boards,$this->StatsForOwner($candidate->guid,"My info as a Candidate","/candidate","/candidate/".$candidate->guid));
        }

        $candidates = CandidateAdministrator::where('user',$user->guid)->get();
        foreach($candidates as $candidate)
        {
            $clr = Candidate::where('guid',$candidate->candidate)->first();
            $usr = User::where('guid',$clr->owner)->first();
            array_push($this->boards,$this->StatsForOwner($clr->guid,"Info for Candidate ".$usr->name,"/candidate/".$clr->guid,"/candidate/".$candidate->guid));
        }

        $councillors = CouncillorAdministrator::where('user',$user->guid)->get();
        foreach($councillors as $councillor)
        {
            $clr = Councillor::where('guid',$councillor->councillor)->first();
            $usr = User::where('guid',$clr->owner)->first();
            array_push($this->boards,$this->StatsForOwner($clr->guid,"Info for Councillor ".$usr->name,"/councillor/".$clr->guid,"/councillor/".$councillor->guid));
        }

        $branches = BranchAdministrator::where('user',$user->guid)->get();
        foreach($branches as $branch)
        {
            $branchinfo = Branch::where('guid',$branch->branch)->first();
            array_push($this->boards,$this->StatsForOwner($branch->branch,"Info for " . $branchinfo->name . " branch.","/cpl/branch/".$branch->branch,"/branch/".$branch->branch));
        }

        $this->menu = new Menu($clpGuid);
    }

    public function StatsForOwner($owner,$description,$link,$view)
    {
        $c =  new \stdClass();
        $c->guid = $owner;
        $c->description = $description;
        $c->link = $link;
        $c->view = $view;

        $c->visits = new \stdClass();
        $c->visits->last7 = array();

        $c->visits->lastweek = Visit::where("owner",$owner)
                            ->where("created_at",">",Carbon::now()->addWeeks(-1))
                            ->count();
        $c->visits->lastmonth = Visit::where("owner",$owner)
                            ->where("created_at",">",Carbon::now()->addWeeks(-4))
                            ->count();
    
        for($i=6;$i>=0;$i--)
        {
            $v = new \stdClass();
            $start = Carbon::now()->addDays($i*-1);
            $end = Carbon::now()->addDays(($i*-1)-1);

            $v->day = $end->format("D");

                        
            $count = Visit::where("owner",$owner)
                                ->where("created_at","<",$start)
                                ->where("created_at",">",$end)
                                ->count();
            $v->visits = $count;
            array_push($c->visits->last7,$v);
        }



        $c->unread = Message::where("to",$owner)->where("status","unread")->count();

        $c->blog = new \stdClass();
        $c->blog->last7 = Blog::where('owner',$owner)->where("created_at",'>',Carbon::now()->addWeeks(-1))->count();
        $c->blog->last28 = Blog::where('owner',$owner)->where("created_at",'>',Carbon::now()->addWeeks(-4))->count();
        $c->blog->total = Blog::where('owner',$owner)->count();

        SocialManager::owner($owner)->addlinks($c);

        return $c;
    }

}
