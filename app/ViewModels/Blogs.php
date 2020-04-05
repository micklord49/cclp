<?php

namespace App\ViewModels;

use App\Branch;
use App\Councillor;
use App\Cclp;
use App\User;
use App\Ward;
use App\Council;
use App\Social;
use App\Blog;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\ViewModels\ImageFile;

class Blogs extends Model
{
    //

    public $title;
    public $clpname;
    public $clpdescription;

    public $items = array();

    public function __construct($owner,$max,$includeowner=true,$excludechildren=false,$guidfilter="")
    {
        $clpGuid = config('appsettings.clpGUID');
        $clps = DB::select('select * from cclps where guid=?',[$clpGuid]);
        if(count($clps) == 0)
        {
            $this->name = "Unknown CLP";
            $this->description = "Please complete the setup";
            return;
        }        

        $this->clpname = $clps[0]->name;
        $this->clpdescription = $clps[0]->description;

        $owners = array();

        switch(substr($owner,0,3))
        {
            case "BRC":
                $branch = Branch::where('guid',$owner)->firstOrFail();
                $this->title = "News from branch ".$branch->name;
                array_push($owners,$owner);
                break;
            case "CNR":
                $councillor = Councillor::where('guid',$owner)->firstOrFail();
                $usr = User::where('guid',$councillor->owner)->first();
                $this->title = "News from councillor ".$usr->name;
                array_push($owners,$owner);
                break;
            case "CLP":
                $this->title = "News from ".$this->clpname;
                if($includeowner)   array_push($owners,$owner);
                if($excludechildren)
                {
                    $councillors = Councillor::where('clp',$owner)->get();
                    foreach($councillors as $councillor)
                    {
                        array_push($owners,$councillor->guid);
                    }
                    $branches = Branch::where('clp',$owner)->get();
                    foreach($branches as $branch)
                    {
                        array_push($owners,$branch->guid);
                    }
                }
                break;
        }

        if($guidfilter != "")
        {
            $blogs = Blog::where('status','<>','draft')->whereIn('owner',$owners)->where('owner', 'like', $guidfilter . '%')->orderBy('created_at', 'DESC')->limit($max)->get();
        }
        else
        {
            $blogs = Blog::where('status','<>','draft')->whereIn('owner',$owners)->orderBy('created_at', 'DESC')->limit($max)->get();
        }
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

            array_push($this->items,$b);
        }


        $this->menu = new Menu($clpGuid);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
