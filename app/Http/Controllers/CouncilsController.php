<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Council;
use App\Councillor;
use App\Ward;

use App\ViewModels\HomeCouncil;
use App\ViewModels\EditCouncil;
use App\ViewModels\Managers\VisitManager;

class CouncilsController extends Controller
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
        if(Auth::check())
        {
            if(!auth()->user()->can('Edit CLP'))
            {
                abort(403);
            }
        }
        else {
            abort(403);
        }

        $clpGuid = config('appsettings.clpGUID');

        Council::create(array(
            'clp' => $clpGuid,
            'guid' => uniqid(),
            'name' => $request->name,
        ));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Council  $councillor
     * @return \Illuminate\Http\Response
     */
    public function show($council)
    {
        $data = new HomeCouncil($council);
        VisitManager::visit($council,"Home");
        return view("council",['Data' => $data]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function edit($council)
    {
        //
        $ret = Council::select('guid','name', 'about', 'wardlocator')->where("guid",$council)->firstOrFail();        
        return($ret);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $council)
    {
        if(Auth::check())
        {
            if(!auth()->user()->can('Edit CLP'))
            {
                //$c = Councillor::where('council',$council)->where('owner',auth()->user()->guid)->count();
            }
            else
            {
                abort(403);
            }
        }
        else {
            abort(403);
        }

        $clpGuid = config('appsettings.clpGUID');
        $c = Council::where('guid',$council)->first();

        try 
        {
            $c->name = $request->name;
            $c->about = $request->about;
            if(isset($request->wardlocator))     $c->wardlocator = $request->wardlocator;
        }
        catch(Exception $e)
        {
            report($e);
        }

        $c->save();
    }



    
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function destroy($councillor)
    {
        //
    }


    public function infoedit($council)
    {
        $clpGuid = config('appsettings.clpGUID');

        if(!Auth::check())
        {
            abort(404);
        }
        $data = new EditCouncil($council);
        return view("editcouncil",['Data' => $data]);
    }

    public function dir()
    {
        Log::info('Councils DIR');

        $clpGuid = config('appsettings.clpGUID');

        app('debugbar')->disable();

        $councils = Council::select('guid','name')->where("clp",$clpGuid)->get();        

        return($councils);
    }

    public function wards($council)
    {
        Log::info('Councils DIR');

        $clpGuid = config('appsettings.clpGUID');

        app('debugbar')->disable();

        $wards = Ward::select('guid','name')->where("council",$council)->orderBy('name', 'ASC')->get();        

        return($wards);
    }
}
