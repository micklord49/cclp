<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\ViewModels\EditClp;
use App\Cclp;
use App\Ward;
use App\Branch;
use App\Tag;
use App\User;


class ClpController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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

        $data = new EditClp();
        return view('editclp',['Data' => $data]);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
        $clp = Cclp::where('guid',$clpGuid)->first();
        $clp->adminusers = User::select('guid')->where('clp',$clpGuid)->permission('Edit CLP')->get();
        $clp->tags = Tag::select('guid')->where('clp',$clpGuid)->get();

        return $clp;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
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
        $clp = Cclp::where('guid',$clpGuid)->first();

        try 
        {
            switch($request->type)
            {
                case 'INFO':
                    $clp->name = $request->name;
                    $clp->description = $request->description ?? '';
                    $clp->analytics = $request->analytics ?? '';
                    $clp->dn = $request->dn ?? '';
                    $clp->phone = $request->phone ?? '';
                    $clp->email = $request->email ?? '';
                    break;
                case 'SOCIAL':
                    $clp->facebook = $request->facebook ?? '';
                    $clp->instagram = $request->instagram ?? '';
                    $clp->twitter = $request->twitter ?? '';
                    $clp->youtube = $request->youtube ?? '';
                    $clp->tumblr = $request->tumblr ?? '';
                    break;
            }
            }
        catch(Exception $e)
        {
            report($e);
        }

        $clp->save();


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function warddir()
    {
        $clpGuid = config('appsettings.clpGUID');
        return Ward::where('clp',$clpGuid)->get();
    }

    public function branchdir()
    {
        $clpGuid = config('appsettings.clpGUID');
        return Branch::where('clp',$clpGuid)->get();
    }

    public function adduser($guid)
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
        $user = User::where('guid',$guid)->firstOrFail();
        $user->givePermissionTo('Edit CLP');

    }

    public function addtag(Request $request)
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
        $tag = Tag::create([
            'guid' => uniqid("TAG"),
            'clp' => $clpGuid,
            'name' => $request->name,
        ]);
    }

    public function tags($owner)
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
        return Tag::where('clp',$clpGuid)->get();
    }

    public function removeuser($guid)
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
        $user = User::where('guid',$guid)->permission('Edit CLP')->firstOrFail();
        $user->revokePermissionTo('Edit CLP');

    }

}
