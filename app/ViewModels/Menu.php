<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Councillor;
use App\CouncillorAdministrator;
use App\Branch;
use App\BranchAdministrator;
use App\User;
use App\Social;

use App\ViewModels\Managers\SocialManager;


class Menu
{
    //

    public $Menu = [];
    public $Class = "";
    public $Extra = "";

    public function __construct($clpGuid)
    {
        $clpGuid = config('appsettings.clpGUID');
        $siteType = config('appsettings.siteType');

        $this->Menu = [ new MenuItem("Home","/",true) ];

        $this->CLPSocial = new \stdClass();
        SocialManager::owner($clpGuid)->addlinks($this->CLPSocial);

        

        switch($siteType)
        {
            case "CLP":
                //$peopleMenu = new MenuItem("People","/people",true);
                //$peopleMenu->AddSubMenu($this->ECMenu($clpGuid));
                //$peopleMenu->AddSubMenu($this->CouncillorsMenu($clpGuid));
                //array_push($this->Menu , $peopleMenu);
                array_push($this->Menu , new MenuItem("Contact","/contact",true));
                array_push($this->Menu , $this->AccountMenu());
        }
    }

    private function AccountMenu()
    {
        $menu = new MenuItem("Account","",true);

        if(Auth::check())
        {
            $this->Class = "navbar-dark bg-dark";

            $menu->AddSubMenu(new MenuItem("Dashboard","/home",true));
            $menu->AddSubMenu(new MenuItem("Edit Profile","/profile/".auth()->user()->guid,true));

            if(auth()->user()->can('Edit CLP'))
            {
                $menu->AddSubMenu(new MenuItem("Edit CLP","/clp",true));
                $menu->AddSubMenu(new MenuItem("Manage Contacts","/contacts",true));
            }
            $this->CouncillorMenu($menu);
            $this->BranchesMenu($menu);
            $menu->AddSubMenu(new MenuItem("Logout","/logout",true));
        }
        else
        {
            $this->Class = "navbar-light navbar-transparent navbar-color-on-scroll";
            $this->Extra = 'color-on-scroll=100';

            $menu->AddSubMenu(new MenuItem("Login","/login",true));
            $menu->AddSubMenu(new MenuItem("Register","/register",true));
        }
        return $menu;
    }

    private function BranchesMenu($menu)
    {
        if(!Auth::check())          return;     //  Only available for logged in user
        $user = auth()->user();
        $branches = BranchAdministrator::where('user',$user->guid)->get();
        foreach($branches as $branch)
        {
            $branchinfo = Branch::where('guid',$branch->branch)->first();
            $menu->AddSubMenu(new MenuItem("Edit " . $branchinfo->name . " branch.","/cpl/branch/" . $branch->branch,true));
        }
    }

    private function CandidateMenu($menu)
    {
        if(!Auth::check())          return;     //  Only available for logged in user
        $user = auth()->user();
        $candidate = Candidate::where('owner',$user->guid)->count();
        if($candidate>0)
        {
            $candidate = Candidate::where('owner',$user->guid)->first();
            $menu->AddSubMenu(new MenuItem("My info as an MP/Candidate","/candidate/",true));
        }
        $candidates = CandidateAdministrator::where('user',$user->guid)->get();
        foreach($candidates as $candidate)
        {
            $clr = Candidate::where('guid',$candidate->candidate)->first();
            $usr = User::where('guid',$clr->owner)->first();
            $menu->AddSubMenu(new MenuItem("Info for MP/Candidate ".$usr->name,"/candidate/".$clr->guid."/infoedit",true));
        }
        return;
    }


    private function CouncillorMenu($menu)
    {
        if(!Auth::check())          return;     //  Only available for logged in user
        $user = auth()->user();
        $councillor = Councillor::where('owner',$user->guid)->count();
        if($councillor>0)
        {
            $councillor = Councillor::where('owner',$user->guid)->first();
            $menu->AddSubMenu(new MenuItem("My info as a Councillor","/councillor/",true));
        }
        $councillors = CouncillorAdministrator::where('user',$user->guid)->get();
        foreach($councillors as $councillor)
        {
            $clr = Councillor::where('guid',$councillor->councillor)->first();
            $usr = User::where('guid',$clr->owner)->first();
            $menu->AddSubMenu(new MenuItem("Info for Councillor ".$usr->name,"/councillors/".$clr->guid."/infoedit",true));
        }
        return;
    }

    private function ECMenu($clpGuid)
    {
        $menu = new MenuItem("Executive Comittee","/people/ec",true);

        $roles = DB::select('select * from clproles where clp=? ORDER BY SortOrder',[$clpGuid]);
        foreach($roles as $role)
        {
            $menu->AddSubItem($role->description,"/people/ec/" . $role->guid,true);
        }
        return $menu;
    }

    private function CouncillorsMenu($clpGuid)
    {
        $menu = new MenuItem("Councillors","/people/councillors",true);

        $clps = DB::select('select * from cclps where guid=?',[$clpGuid]);
        if(count($clps) == 0)   return $menu;
        if($clps[0]->groupCouncillorsByWard)
        {
            $wards = DB::select('select distinct ward from councillors where clp=? ORDER BY ward',[$clpGuid]);
            foreach($wards as $ward)
            {
                $councillors = DB::select('select councillors.guid,users.name,brandAsClp,dn from councillors,users where councillors.user=users.guid AND councillors.clp=? and ward=? ORDER BY users.name',[$clpGuid,$ward->ward]);
                foreach($councillors as $councillor)
                {
                    if($councillor->brandAsClp)
                    {
                        $menu->AddSubItem($councillor->name,"/people/councillor/" . $councillor->guid,true);
                    }
                    else
                    {
                        $menu->AddSubItem($councillor->name,$councillor->dn . "/",true);
                    }
                }
            }
        }
        else
        {
            $councillors = DB::select('select councillors.guid,users.name,brandAsClp,dn from councillors,users where councillors.user=users.guid AND councillors.clp=? ORDER BY users.name',[$clpGuid]);
            foreach($councillors as $councillor)
            {
                if($councillor->brandAsClp)
                {
                    $menu->AddSubItem($councillor->name,"/people/councillor/" . $councillor->guid,true);
                }
                else
                {
                    $menu->AddSubItem($councillor->name,$councillor->dn . "/",true);
                }
            }
        }

        return $menu;
    }

}

