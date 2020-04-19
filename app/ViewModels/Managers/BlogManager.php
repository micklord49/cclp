<?php

namespace App\ViewModels\Managers;

use App\Branch;
use App\Councillor;
use App\Council;
use App\Ward;
use App\Campaign;
use App\Blog;

use App\ViewModels\ImageFile;

class BlogManager
{
    public static function for($guid)
    {

        $ret = new IBlogs($guid);


        switch(substr($guid,0,3))
        {
            case 'CLP':
                $ret->addBranches($guid);
                $ret->addCouncillors($guid);
                $ret->addCampaigns($guid);
                break;
            case 'CNR':
                $ret->addCampaigns($guid);
                break;
            case 'BRC':
                $ret->addCampaigns($guid);
                break;
            case 'CMP':
                $ret->addReference($guid);
            case 'CNC':
                $ret->addCouncil($guid);
                break;
        }

        return $ret;
    }

    public static function forCouncillors($guid)
    {

        $ret = new IBlogs($guid);
        $ret->addCouncillors($guid);
        return $ret;
    }

    public static function forBranches($guid)
    {

        $ret = new IBlogs($guid);
        $ret->addBranches($guid);
        return $ret;
    }
}

class IBlogs
{
    private $owners = array();
    private $referencies = array();

    public function __construct($guid)
    {
        array_push($this->owners,$guid);
    }

    public function addBranches($owner)
    {
        $branches = Branch::where("clp",$owner)->get();
        foreach($branches as $branch)
        {
            array_push($this->owners,$branch->guid);
            $this->addCampaigns($branch->guid);
        }
    }

    public function addCouncil($council)
    {
        $wards = Ward::where("council",$council)->get();
        foreach($wards as $ward)
        {
            array_push($this->owners,$ward->guid);
            $councillors = Councillor::where("ward",$ward->guid)
                        ->where('active',true)
                        ->get();
            foreach($councillors as $councillor)
            {
                array_push($this->owners,$councillor->guid);
                $this->addCampaigns($councillor->guid);
            }
        }
    }


    public function addCouncillors($owner)
    {
        $councillors = Councillor::where("clp",$owner)
                                    ->where('active',true)
                                    ->get();
        foreach($councillors as $councillor)
        {
            array_push($this->owners,$councillor->guid);
            $this->addCampaigns($councillor->guid);
        }
    }

    public function addCampaigns($owner)
    {
        $campaigns = Campaign::where("owner",$owner)
                                ->where('active',true)
                                ->get();
        foreach($campaigns as $campaign)
        {
            array_push($this->owners,$campaign->guid);
            $this->addReference($campaign->guid);
        }
    }

    public function addReference($guid)
    {
        $blogs = Blog::where("showcampaign",true)
                        ->where('campaign',$guid)
                        ->get();
        foreach($blogs as $blog)
        {
            array_push($this->referencies,$blog->guid);
        }
    }

    public function get()
    {
        return Blog::where(function ($query) {
                        $query->whereIn('owner',$this->owners)
                              ->orWhereIn('guid',$this->referencies);
                    })
                    ->where('status','<>','draft')
                    ->get();
    }

    public function getCards()
    {
        $blogs = $this->get();
        $items = array();
        foreach($blogs as $blog)
        {
            $b = new class {};
            $b->guid = $blog->guid;
            $b->title = $blog->title;
            $b->subtitle = $blog->subtitle;
            $b->body = $blog->body;

            $i = new ImageFile($blog->guid);
            if($i->filename != "")
            {
                $b->image = $i->filename;
            }
            else
            {
                $b->image = "/images/defaultpost.png";
            }
            $b->publishedon = $blog->created_at;

            array_push($items,$b);
        }

        return $items;
    }
}


