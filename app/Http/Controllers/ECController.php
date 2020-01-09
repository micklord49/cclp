<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\ViewModels\EditEC;

use App\ClpRoleuser;

class ECController extends Controller
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
    public function edit($ec)
    {
        Log::info('Creating EditEC ');
        $ec = new EditEC();
        return($ec);
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

    public function addrolluser($role,$user)
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

        ClpRoleuser::create(array(
            'clp' => $clpGuid,
            'clprole' => $role,
            'user' => $user
        ));

        Log::info('Adding user '.$user.' to role '.$role);

    }
}
