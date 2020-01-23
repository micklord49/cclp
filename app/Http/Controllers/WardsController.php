<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Council;
use App\Ward;


class WardsController extends Controller
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

        Ward::create(array(
            'clp' => $clpGuid,
            'guid' => uniqid(),
            'council' => $request->council,
            'name' => $request->name,
            'description' => '',
        ));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function show($request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Wards  $ward
     * @return \Illuminate\Http\Response
     */
    public function edit($ward)
    {
        //
        $ret = Ward::select('guid','name')->where("guid",$ward)->get();        
        return($ret);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $ward)
    {
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
        $w = Ward::where('guid',$ward)->first();

        try 
        {
            $w->name = $request->name;
        }
        catch(Exception $e)
        {
            report($e);
        }

        $w->save();
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


}
