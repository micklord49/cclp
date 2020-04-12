<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\ViewModels\Managers\BlogManager;

use App\Council;
use App\Candidate;

class Home extends Model
{
    //

    public $name;
    public $description;
    public $guid;
    public $msg;
    public $councils;
    public $candidate;
    public $news;
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
        $this->clpguid = $clpGuid;
        $this->clpname = $clps[0]->name;
        $this->analytics = $clps[0]->analytics;

        $this->name = $clps[0]->name;
        $this->description = $clps[0]->description;

        $councils = Council::where('clp',$clpGuid)->count();
        if($councils == 1)
        {
            $council = Council::where('clp',$clpGuid)->first();
            $this->councilsingle = true;
            $this->councilcardtitle = $council->name;
            $this->councilguid = $council->guid;
        }
        elseif($councils > 0)
        {
            $this->councilcardtitle = "Our Councils";
            $this->councilsingle = false;
            $councils = Council::where('clp',$clpGuid)->get();
            $this->councils = array();
            foreach($councils as $council)
            {
                $b = new \stdClass();
                $b->name = $council->name;
                $b->guid = $council->guid;
                array_push($this->councils,$b);
            }
        }


        $candidate = Candidate::where('clp',$clpGuid)->first();
        if(isset($candidate))
        {
            $this->candidate = $candidate->card();
        }

        //$this->news = new Blogs($clpGuid,6,true,true);
        $this->news = BlogManager::for($clpGuid)->getCards();

        $this->menu = new Menu($clpGuid);



        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
