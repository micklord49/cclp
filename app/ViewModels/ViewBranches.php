<?php

namespace App\ViewModels;

use App\Branch;
use App\User;
use App\Ward;
use App\Council;
use App\Social;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\ViewModels\ImageFile;
use App\ViewModels\Blogs;

class ViewBranches extends Model
{
    //

    public $branches = array();
    public $news;

    public function __construct($clpGuid)
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
        $this->clpname = $clps[0]->name;
        $this->clpdescription = $clps[0]->description;

        $branches = Branch::where('clp',$clpGuid)->get();
        foreach($branches as $branch)
        {
            $b = new class {};
            $b->branch = $branch->name;
            $b->guid = $branch->guid;

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

        $this->news = new Blogs($clpGuid,6,false,true,"BRC");

        $this->menu = new Menu($clpGuid);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
