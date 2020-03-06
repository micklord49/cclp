<?php

namespace App\ViewModels\Managers;

use Carbon\Carbon;

use App\Social;
use App\Visit;
use App\Message;
use App\Blog;

class StatsManager
{
    public static function owner($owner,$description,$link)
    {
        $c =  new \stdClass();
        $c->guid = $owner;
        $c->description = $description;
        $c->link = $link;

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