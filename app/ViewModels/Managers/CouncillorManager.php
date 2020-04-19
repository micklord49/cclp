<?php

namespace App\ViewModels\Managers;

use App\Campaign;
use App\Branch;
use App\User;
use App\Ward;
use App\Councillor;
use App\Council;

use App\ViewModels\ImageFile;

class CouncillorManager
{
    public static function forCLP($guid)
    {
        return new ICouncillors('clp',$guid);
    }

    public static function forWard($guid)
    {
        return new ICouncillors('ward',$guid);
    }

    public static function forBranch($guid)
    {
        return new ICouncillors('branch',$guid);
    }
}

class ICouncillors
{
    private $councillors;

    public function __construct($column,$value)
    {
        $this->councillors = Councillor::where($column,$value)->get();
    }

    public function addCards(&$owners = null)
    {
        $ret = array();

        foreach($this->councillors as $councillor)
        {
            if(isset($owners))     array_push($owners,$councillor->guid);
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

            array_push($ret,$c);
        }

        return $ret;
    }

}

