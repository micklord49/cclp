<?php

namespace App\ViewModels\Managers;

use App\Branch;
use App\Council;
use App\Councillor;
use App\Campaign;
use App\Cclp;
use App\Blog;
use App\User;

use App\ViewModels\ImageFile;

class LinkManager
{
    public static function for($guid)
    {
        $ret = new \stdClass();

        switch(substr($guid,0,3))
        {
            case 'CLP':
                $l = Cclp::where('guid',$guid)->firstOrFail();
                $ret->name = $l->name;
                $ret->url = "/";
                break;
            case 'CNR':
                $l = Councillor::where('guid',$guid)->firstOrFail();
                $u = User::where('guid',$l->owner)->firstOrFail();
                $ret->name = $u->name;
                $ret->description = "Councillor";
                $ret->url = "/councillor/".$guid;
                break;
            case 'CNC':
                $l = Council::where('guid',$guid)->firstOrFail();
                $ret->name = $l->name;
                $ret->description = "Council";
                $ret->url = "/council/".$guid;
                break;
            case 'BRC':
                $l = Branch::where('guid',$guid)->firstOrFail();
                $ret->name = $l->name;
                $ret->description = "Local Branch";
                $ret->url = "/branch/".$guid;
                break;
            case 'CMP':
                $l = Campaign::where('guid',$guid)->firstOrFail();
                $ret->name = $l->name;
                $ret->description = "The Campaign";
                $ret->url = "/campaign/".$guid;
                break;
            break;
        }

        return $ret;

    }
}

