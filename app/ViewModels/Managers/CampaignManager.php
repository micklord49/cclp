<?php

namespace App\ViewModels\Managers;

use App\Campaign;
use App\Branch;
use App\Councillor;

class CampaignManager
{
    public static function forCLP($guid)
    {
        $owner = array();
        array_push($owner,$guid);
        $branches = Branch::where('clp',$guid)->get();
        foreach($branches as $branch)
        {
            array_push($owner,$branch->guid);
        }
        $councillors = Councillor::where('clp',$guid)->get();
        foreach($councillors as $councillor)
        {
            array_push($owner,$councillor->guid);
        }
        return Campaign::whereIn('owner',$owner);
    }

    public static function for($guid)
    {
        return Campaign::where('owner',$owner);
    }
}



