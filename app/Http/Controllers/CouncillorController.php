<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Councilor;
use Illuminate\Http\Request;

use App\ViewModels\EditCouncillor;


class CouncillorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clpGuid = config('appsettings.clpGUID');

        if(!Auth::check())
        {
            abort(404);
        }
        $user = auth()->user();
        $data = new EditCouncillor($user->guid);
        if($data->guid=="") about(404);
        return view("editcouncillor",['Data' => $data]);
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
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Councilor  $councilor
     * @return \Illuminate\Http\Response
     */
    public function show(Councilor $councilor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Councilor  $councilor
     * @return \Illuminate\Http\Response
     */
    public function edit(Councilor $councilor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Councilor  $councilor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Councilor $councilor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Councilor  $councilor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Councilor $councilor)
    {
        //
    }

    public function dir()
    {
        Log::info('Councillors DIR');

        $clpGuid = config('appsettings.clpGUID');

        app('debugbar')->disable();

        $councillors = Councilor::select('owner')->where("clp",$clpGuid)->get();
        $u = array();
        foreach($councillors as $c)
        {
            $new = new \stdClass();
            $new->guid = $c->owner;

            array_push($u,$new);
        }
        return($u);
    }

    public function removeuser($user)
    {
        if(Auth::check())
        {
            if(!auth()->user()->can('Edit CLP'))
            {
                abort(404);
            }
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');

        Councilor::where('owner',$user)->delete();
        Log::info('Removing user '.$user.' as a councillor');
    }

    public function adduser($user)
    {
        if(Auth::check())
        {
            if(!auth()->user()->can('Edit CLP'))
            {
                abort(404);
            }
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');

        Councilor::create(array(
            'clp' => $clpGuid,
            'guid' => uniqid("CNR"),
            'ward' => '',
            'owner' => $user
        ));

        Log::info('Adding user '.$user.' as a councillor');
    }


}
