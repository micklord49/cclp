<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\ContactList;
use App\ListContact;

class ListController extends Controller
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
        Log::debug($request);
        if($request->guid!="")
        {
            //  Update blog post
            $list = ContactList::where('guid',$request->guid)->firstOrFail();    
            if(isset($request->type))     $list->type=$request->type;
            if(isset($request->description))     $list->description=$request->description;
            if(isset($request->requestaddress))     $list->requestaddress=$request->requestaddress;
            if(isset($request->requireaddress))     $list->requireaddress=$request->requireaddress;
            if(!isset($request->requestaddress))     $list->requestaddress=0;
            if(!isset($request->requireaddress))     $list->requireaddress=0;
        }
        else
        {
            //  Create list
            $list = new ContactList;
            $list->guid = uniqid("LST");
            $list->owner=$request->owner;
        }
        if(isset($request->title))     $list->title=$request->title;
        if(isset($request->subtitle))     $list->subtitle=$request->subtitle;
        $list->save();        
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
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit($guid)
    {
        $list = ContactList::where('guid',$guid)->firstOrFail();
        return $list->toJson();
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


        $data->data = ContactList::select('guid','type','title','subtitle')->where("owner",$owner)->skip($perpage*($page-1))->take($perpage)->get();
        foreach($data->data as $list)
        {
            $list->contactscount = ListContact::where('list',$list->guid)->count();
        }
        $data->page = $page;
        $data->count = ContactList::where("owner",$owner)->count();

        return(json_encode($data));
    }

}
