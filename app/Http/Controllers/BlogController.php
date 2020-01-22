<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Blog;

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
            //  Create blog post
            $blog = Blog::where('guid',$request->guid)->firstOrFail();    
        }
        else
        {
            //  Create blog post
            $blog = new Blog;
            $blog->guid = uniqid("BLG");
            $blog->owner=$request->owner;
        }
        $blog->title=$request->title;
        $blog->body=$request->body;
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
        $post = Blog::where('guid',$guid)->firstOrFail();
        return $post->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit($guid)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $branch)
    {
        //
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


        $data->data = Blog::select('guid','title','publishedOn')->where("owner",$owner)->skip($perpage*($page-1))->take($perpage)->get();        
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
