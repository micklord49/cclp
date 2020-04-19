<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Tag;
use App\TagOwner;

use App\ViewModels\ViewBranches;
use App\ViewModels\HomeCampaign;
use App\ViewModels\EditBranch;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
        if(!Auth::check())
        {
            abort(403);
        }

        $clpGuid = config('appsettings.clpGUID');

        Tag::create(array(
            'guid' => uniqid("TAG"),
            'tag' => $clpGuid,
            'name' => $request->name,
        ));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function show($tag)
    {
        //
        return Tag::where('guid',$tag)->firstOrFail();
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit($tag)
    {
        //
        $ret = Tag::where('guid',$tag)->firstOrFail();        
        return $ret;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $tag)
    {
        //
        //
        if(Auth::check())
        {
            $user = auth()->user();
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');
        $t = Tag::where('guid',$tag)->firstOrFail();
        if(isset($request->name)) $t->name = $request->name;
        $t->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function destroy(Branch $branch)
    {
        //
    }

    public function dir($owner)
    {
        $clpGuid = config('appsettings.clpGUID');
        $tags = TagOwner::where("owner",$owner)->get();
        $c = array();
        foreach($tags as $tag)
        {
            $t = Tag::where("guid",$tag->tag)->firstOrFail();
            $new = new \stdClass();
            $new->key = $tag->guid;
            $new->guid = $tag->tag;
            $new->name = $t->name;

            array_push($c,$new);
        }
        return($c);
    }

}
