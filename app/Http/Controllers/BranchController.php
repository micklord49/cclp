<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Branch;
use App\ViewModels\ViewBranches;
use App\ViewModels\HomeBranch;
use App\ViewModels\HomeBranches;
use App\ViewModels\EditBranch;
use App\ViewModels\Managers\SocialManager;
use App\ViewModels\VisitManager;
use App\BranchAdministrator;
use Illuminate\Http\Request;


class BranchController extends Controller
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


        $data = new HomeBranches($clpGuid);
        VisitManager::visit($data->clpguid,"Banches");
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
            if(!auth()->user()->can('Edit CLP'))
            {
                abort(403);
            }
        }
        else {
            abort(403);
        }

        $clpGuid = config('appsettings.clpGUID');

        Branch::create(array(
            'clp' => $clpGuid,
            'guid' => uniqid("BRC"),
            'name' => $request->name,
        ));

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
        VisitManager::visit($branch,"Home");
        return view("branch",['Data' => $data]);
    }


     public function showcplbranch($branch)
    {
        //
        $clpGuid = config('appsettings.clpGUID');

        if(!Auth::check())
        {
            abort(404);
        }
        $user = auth()->user();

        

        $data = new EditBranch($branch,$user->guid);
        if($data->guid=="") about(404);
        return view("cplbranch",['Data' => $data]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit($branch)
    {
        //
        $ret = Branch::where('guid',$branch)->firstOrFail();        
        $users = BranchAdministrator::where('branch',$branch)->get();
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $branch)
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
        $branch = Branch::where('guid',$branch)->firstOrFail();

        switch($request->type)
        {
            case 'INFO':
                if(isset($request->name)) $branch->name = $request->name;
                if(isset($request->dn)) $branch->dn = $request->dn;
                if(isset($request->intro)) $branch->intro = $request->intro;
                if(isset($request->about)) $branch->about = $request->about;
                break;
        }

        $branch->save();

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


    public function dir()
    {
        Log::info('Banch DIR');

        $clpGuid = config('appsettings.clpGUID');

        //app('debugbar')->disable();

        $branches = Branch::where("clp",$clpGuid)->get();
        $b = array();
        foreach($branches as $branch)
        {
            $new = new \stdClass();
            $new->guid = $branch->guid;
            $new->name = $branch->name;
            SocialManager::owner($branch->guid)->addlinks($new);

            array_push($b,$new);
        }
        return($b);
    }

    public function removeuser($branch,$user)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');

        BranchAdministrator::where('user',$user)->where('branch',$branch)->delete();
        Log::info('Removing user '.$user.' as a branch admin');
    }

    public function adduser($branch,$user)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');

        BranchAdministrator::create(array(
            'guid' => uniqid("BAU"),
            'branch' => $branch,
            'user' => $user
        ));

        Log::info('Adding user '.$user.' as a branch admin user');
    }

}
