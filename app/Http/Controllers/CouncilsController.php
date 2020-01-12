<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

use App\Council;
use App\Ward;


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
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Councilor  $councilor
     * @return \Illuminate\Http\Response
     */
    public function show($councilor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Councilor  $councilor
     * @return \Illuminate\Http\Response
     */
    public function edit($council)
    {
        //
        $ret = Council::select('guid','name')->where("guid",$council)->get();        
        return($ret);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Councilor  $councilor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $councilor)
    {
        //        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Councilor  $councilor
     * @return \Illuminate\Http\Response
     */
    public function destroy($councilor)
    {
        //
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

        $wards = Ward::select('guid','name')->where("council",$council)->get();        

        return($wards);
    }
}
