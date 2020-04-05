<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Spatie\CalendarLinks\Link;

use App\Blog;
use App\ContactList;

use App\ViewModels\Managers\SocialManager;


class HomeBlog extends Model
{
    //

    public $msg;
    public $clpname;
    public $guid;
    public $title;
    public $subtitle;
    public $body;
    public $image;
    public $campaigns = array();
    public $events = array();
    public $nextevent;
    public $news;
    public $useactionlist;
    public $actionlist;
    public $list;
    public $menu;    

    public function __construct($guid)
    {
        $clpGuid = config('appsettings.clpGUID');
        $clps = DB::select('select * from cclps where guid=?',[$clpGuid]);
        if(count($clps) == 0)
        {
            return;
        }

        $this->clpguid = $clpGuid;
        $this->clpname = $clps[0]->name;
        $this->analytics = $clps[0]->analytics;

        $blog = Blog::where('guid',$guid)->firstOrFail();
        $owners = array();

        $this->guid = $guid;

        $this->title = $blog->title;
        $this->subtitle = $blog->subtitle;
        $this->body = $blog->body;
        $this->status = $blog->status;
        $this->priority = $blog->priority;        

        $i = new ImageFile($guid);
        if($i->guid != "")
        {
            $this->imageguid = $i->guid;
            $this->image = $i->filename;
        }

        $this->useactionlist = $blog->useactionlist == 1;
        $this->actionlist = $blog->actionlist;
        if(($this->actionlist ?? '') != '')
        {
            $this->list = ContactList::where('guid',$blog->actionlist)->first();
        }

        $this->menu = new Menu($clpGuid);


        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
