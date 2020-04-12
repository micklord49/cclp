<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Blog;
use App\PublishEvent;
use App\ContactList;
use App\Campaign;
use App\ViewModels\Managers\CampaignManager;

use App\ViewModels\HomeBlog;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        if($request->guid!="")
        {
            //  Update blog post
            $blog = Blog::where('guid',$request->guid)->firstOrFail();    
            if(isset($request->body))     $blog->body=$request->body;
            if(isset($request->useactionlist))     $blog->useactionlist=$request->useactionlist;
            if(isset($request->actionlist))     $blog->actionlist=$request->actionlist;
            if(isset($request->showcampaign))     $blog->showcampaign=$request->showcampaign;
            if(isset($request->campaign))     $blog->campaign=$request->campaign;
            if(isset($request->status))     $blog->status=$request->status;
            if(isset($request->tofacebook))     $blog->tofacebook=$request->tofacebook;
            if(isset($request->totwitter))     $blog->totwitter=$request->totwitter;
            if(isset($request->publishfrom))     $blog->publishFrom=$request->publishfrom;
            if(isset($request->publishnow))     $blog->publishNow=$request->publishnow;
            if(isset($request->priority))     $blog->priority=$request->priority;
        }
        else
        {
            //  Create blog post
            $blog = new Blog;
            $blog->guid = uniqid("BLG");
            $blog->owner=$request->owner;
        }
        if(isset($request->title))     $blog->title=$request->title;
        if(isset($request->subtitle))     $blog->subtitle=$request->subtitle;
        $blog->save();        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function show($guid)
    {
        //
        $post = new HomeBlog($guid);
        $post->published = $post->status=="published";
        return view('blog',['Data' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit($guid)
    {
        $post = Blog::where('guid',$guid)->firstOrFail();
        $post->published = $post->status!="draft";
        $post->events = PublishEvent::where('owner',$guid)->get();
        $lists = ContactList::where('owner',$post->owner)->get();
        $select = array();
        //$l = new \stdClass();
        //$l->value = "";
        //$l->display = "Select your list";
        //array_push($select,$l);
        foreach($lists as $list)
        {
            $l = new \stdClass();
            $l->value = $list->guid;
            $l->display = $list->title;
            array_push($select,$l);
        }

        $lists = ContactList::where('owner',$post->owner)->get();
        $select = array();
        //$l = new \stdClass();
        //$l->value = "";
        //$l->display = "Select your list";
        //array_push($select,$l);
        foreach($lists as $list)
        {
            $l = new \stdClass();
            $l->value = $list->guid;
            $l->display = $list->title;
            array_push($select,$l);
        }
        $post->lists = $select;

        $select = array();
        $clpGuid = config('appsettings.clpGUID');
        foreach(CampaignManager::forCLP($clpGuid)->get() as $campaign)
        {
            $l = new \stdClass();
            $l->value = $campaign->guid;
            $l->display = $campaign->title;
            array_push($select,$l);
        }
        $post->campaigns = $select;
        
        return $post->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $blog)
    {
        //
        $this->store($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function destroy($branch)
    {
        //
    }

    public function ownersearch($perpage,$page,$owner)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        
        app('debugbar')->disable();


        $data->data = Blog::select('guid','title','publishedOn', 'status')->where("owner",$owner)->skip($perpage*($page-1))->take($perpage)->get();        
        $data->page = $page;
        $data->count = Blog::where("owner",$owner)->count();
        foreach($data->data as $post)
        {

            if($post->publishedOn = null) {
                $post->edit = true;
            }
            else{
                $post->edit = false;
            }
        }

        return(json_encode($data));
    }

}
