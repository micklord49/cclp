<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


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

        $this->Class = "navbar-light bg-light ";
        //$this->Extra = 'color-on-scroll=50';

        switch($siteType)
        {
            case "CLP":
                //$peopleMenu = new MenuItem("People","/people",true);
                //$peopleMenu->AddSubMenu($this->ECMenu($clpGuid));
                //$peopleMenu->AddSubMenu($this->CouncilorsMenu($clpGuid));
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

            $menu->AddSubMenu(new MenuItem("Edit Profile","/profile",true));

            if(auth()->user()->can('Edit CLP'))
            {
                $menu->AddSubMenu(new MenuItem("Edit CLP","/clp",true));
                $menu->AddSubMenu(new MenuItem("Edit the people of the CLP","/people",true));
            }

            $menu->AddSubMenu(new MenuItem("Logout","/logout",true));
        }
        else
        {
            $menu->AddSubMenu(new MenuItem("Login","/login",true));
            $menu->AddSubMenu(new MenuItem("Register","/register",true));
        }
        return $menu;
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

    private function CouncilorsMenu($clpGuid)
    {
        $menu = new MenuItem("Councilors","/people/councilors",true);

        $clps = DB::select('select * from cclps where guid=?',[$clpGuid]);
        if(count($clps) == 0)   return $menu;
        if($clps[0]->groupCouncilorsByWard)
        {
            $wards = DB::select('select distinct ward from councilors where clp=? ORDER BY ward',[$clpGuid]);
            foreach($wards as $ward)
            {
                $councilors = DB::select('select councilors.guid,users.name,brandAsClp,dn from councilors,users where councilors.user=users.guid AND councilors.clp=? and ward=? ORDER BY users.name',[$clpGuid,$ward->ward]);
                foreach($councilors as $councilor)
                {
                    if($councilor->brandAsClp)
                    {
                        $menu->AddSubItem($councilor->name,"/people/councilor/" . $councilor->guid,true);
                    }
                    else
                    {
                        $menu->AddSubItem($councilor->name,$councilor->dn . "/",true);
                    }
                }
            }
        }
        else
        {
            $councilors = DB::select('select councilors.guid,users.name,brandAsClp,dn from councilors,users where councilors.user=users.guid AND councilors.clp=? ORDER BY users.name',[$clpGuid]);
            foreach($councilors as $councilor)
            {
                if($councilor->brandAsClp)
                {
                    $menu->AddSubItem($councilor->name,"/people/councilor/" . $councilor->guid,true);
                }
                else
                {
                    $menu->AddSubItem($councilor->name,$councilor->dn . "/",true);
                }
            }
        }

        return $menu;
    }

}

