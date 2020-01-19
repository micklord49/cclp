<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

use App\ViewModels\Userdir;
use App\ViewModels\ImageFile;
use App\User;

class UserdirController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new EditEC();
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
     */
    public function show($ec)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     */
    public function edit($user)
    {
        Log::info('Creating Userdir for '.$user);
        $u = new Userdir($user);
        return($u);
    }

    public function search($perpage,$page)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        
        app('debugbar')->disable();


        $data->data = User::select('guid','name','publicemail')->where("clp",$clpGuid)->skip($perpage*($page-1))->take($perpage)->get();        
        $data->page = $page;
        $data->count = User::where("clp",$clpGuid)->count();
        foreach($data->data as $user)
        {
            $image = new ImageFile($user->guid);
            if($image->filename=="")
            {
                $user->image="/images/defaultuser.png";
            }
            else{
                $user->image = $image->filename;
            }
        }

        return(json_encode($data));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ec  $ec
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $ec)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ec  $ec
     * @return \Illuminate\Http\Response
     */
    public function destroy($ec)
    {
        //
    }
}
