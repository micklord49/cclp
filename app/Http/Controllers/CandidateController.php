<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Candidate;
use App\CandidateAdministrator;

use App\ViewModels\EditCandidate;
use App\ViewModels\HomeCandidate;
use App\ViewModels\Managers\VisitManager;



class CandidateController extends Controller
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
        $clr = Candidate::where('owner',$user->guid)->firstOrFail();

        $data = new EditCandidate($clr->guid);
        return view("editcandidate",['Data' => $data]);
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
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function show($candidate)
    {
        //
        $clpGuid = config('appsettings.clpGUID');


        $data = new HomeCandidate($candidate);
        VisitManager::visit($candidate,"Home");
        return view("candidate",['Data' => $data]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function edit($candidate)
    {
        //
        $ret = Candidate::where('guid',$candidate)->firstOrFail();
        $users = CandidateAdministrator::where('candidate',$candidate)->get();
        $adminusers = array();
        foreach($users as $user)
        {
            $new = new \stdClass();
            $new->guid = $user->user;
            array_push($adminusers,$new);
        }
        $ret->adminusers = $adminusers;

        return $ret;
    }


    public function infoedit($candidate)
    {
        $clpGuid = config('appsettings.clpGUID');

        if(!Auth::check())
        {
            abort(404);
        }
        $data = new EditCandidate($candidate);
        return view("editcandidate",['Data' => $data]);
    //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $candidate)
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
        $user = Candidate::where('guid',$candidate)->firstOrFail();

        switch($request->type)
        {
            case 'INFO':
                if(isset($request->dn)) $user->dn = $request->dn;
                $user->intro = $request->intro;
                $user->email = $request->email;
                $user->about = $request->about;
                if(isset($request->active)) $user->active = $request->active;
                if(isset($request->campaign)) $user->campaign = $request->campaign;
                break;
        }

        $user->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Candidate $candidate)
    {
        //
    }

    public function dir()
    {
        Log::info('Candidates DIR');

        $clpGuid = config('appsettings.clpGUID');

        app('debugbar')->disable();

        $candidates = Candidate::select('owner')->where("clp",$clpGuid)->get();
        $u = array();
        foreach($candidates as $c)
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

        Candidate::where('owner',$user)->delete();
        Log::info('Removing user '.$user.' as a candidate');
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

        Candidate::create(array(
            'clp' => $clpGuid,
            'guid' => uniqid("CAN"),
            'owner' => $user
        ));

        Log::info('Adding user '.$user.' as a candidate');
    }


    public function removeadminuser($candidate,$user)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');

        CandidateAdministrator::where('user',$user)->where('candidate',$candidate)->delete();
        Log::info('Removing user '.$user.' as a candidate admin');
    }

    public function addadminuser($candidate,$user)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');

        $count = CandidateAdministrator::where('candidate',$candidate)->where('user',$user)->count();
        if($count==0)
        {
            CandidateAdministrator::create(array(
                'guid' => uniqid("KAU"),
                'candidate' => $candidate,
                'user' => $user
            ));
        }


        Log::info('Adding user '.$user.' as a candidate admin user');
    }

}
