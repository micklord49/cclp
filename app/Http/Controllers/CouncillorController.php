<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Councillor;
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
        Log::info('Editing Councillor '.$user->guid);

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
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function show(Councillor $councillor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function edit($councillor)
    {
        //
        $ret = Councillor::where('guid',$councillor)->firstOrFail();
        return $ret;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $councillor)
    {
        //
        if(Auth::check())
        {
            $user = auth()->user();
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');
        $user = Councillor::where('guid',$councillor)->firstOrFail();

        switch($request->type)
        {
            case 'INFO':
                if(isset($request->ward)) $user->ward = $request->ward;
                if(isset($request->dn)) $user->dn = $request->dn;
                if(isset($request->intro)) $user->intro = $request->intro;
                if(isset($request->about)) $user->about = $request->about;
                if(isset($request->active)) $user->active = $request->active;
                if(isset($request->campaign)) $user->campaign = $request->campaign;
                break;
        }

        $user->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Councillor $councillor)
    {
        //
    }

    public function dir()
    {
        Log::info('Councillors DIR');

        $clpGuid = config('appsettings.clpGUID');

        app('debugbar')->disable();

        $councillors = Councillor::select('owner')->where("clp",$clpGuid)->get();
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

        Councillor::where('owner',$user)->delete();
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

        Councillor::create(array(
            'clp' => $clpGuid,
            'guid' => uniqid("CNR"),
            'ward' => '',
            'owner' => $user
        ));

        Log::info('Adding user '.$user.' as a councillor');
    }


}
