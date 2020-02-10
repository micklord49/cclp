<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Event;

use App\ViewModels\ViewBranches;
use App\ViewModels\HomeBranch;
use App\ViewModels\EditBranch;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $clpGuid = config('appsettings.clpGUID');


        $data = new ViewBranches($clpGuid);
        if($data->guid=="") about(404);
        return view("branches",['Data' => $data]);
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
        if(Auth::check())
        {
        }
        else {
            abort(403);
        }

        $clpGuid = config('appsettings.clpGUID');
        $newguid=uniqid("EVT");
        Event::create(array(
            'guid' => $newguid,
            'owner' => $request->owner,
            'title' => $request->title,
            'subtitle' => '',
            'location' => '',
            'starttime' => Carbon::create(
                    substr($request->start,0,4),
                    substr($request->start,5,2),
                    substr($request->start,8,2),
                    substr($request->start,11,2),
                    substr($request->start,14,2),
            ),
            'endtime' => Carbon::create(
                substr($request->end,0,4),
                substr($request->end,5,2),
                substr($request->end,8,2),
                substr($request->end,11,2),
                substr($request->end,14,2),
                ),
        ));
        return $newguid;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function show($branch)
    {
        //
        $clpGuid = config('appsettings.clpGUID');


        $data = new HomeBranch($branch);
        if($data->guid=="") abort(404);
        return view("branch",['Data' => $data]);
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit($event)
    {
        //
        $ret = Event::where('guid',$event)->firstOrFail();        
        return $ret;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $event)
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
        $evt = Event::where('guid',$event)->firstOrFail();

        switch($request->type)
        {
            case 'INFO':
                if(isset($request->title)) $evt->title = $request->title;
                if(isset($request->subtitle)) $evt->subtitle = $request->subtitle;
                if(isset($request->location)) $evt->location = $request->location;
                if(isset($request->starttime)) $evt->starttime = $request->starttime;
                if(isset($request->endtime)) $evt->endtime = $request->endtime;
                break;
        }

        $evt->save();

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
        Log::info('Campaign DIR');

        $clpGuid = config('appsettings.clpGUID');

        //app('debugbar')->disable();

        $events = Event::where("owner",$owner)->get();
        $e = array();
        foreach($events as $event)
        {
            $new = new \stdClass();
            $new->title = $event->title;
            $new->start = $event->starttime;
            $new->end = $event->endtime;
            $new->allDay = false;
            $new->resource = $event->guid;

            array_push($e,$new);
        }
        return($e);
    }


}
