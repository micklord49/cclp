<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Campaign;
use App\CampaignUser;
use App\ContactList;
use App\Tag;
use App\TagOwner;

use App\ViewModels\HomeCampaign;
use App\ViewModels\EditCampaign;
use Illuminate\Http\Request;

use App\ViewModels\Managers\VisitManager;
use App\ViewModels\Managers\ListsManager;
use App\ViewModels\Managers\TagManager;
use App\ViewModels\Managers\StatsManager;

class CampaignController extends Controller
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
        if(!Auth::check())
        {
            abort(403);
        }

        $clpGuid = config('appsettings.clpGUID');

        Campaign::create(array(
            'guid' => uniqid("CMP"),
            'title' => $request->title,
            'owner' => $request->owner,
            'subtitle' => '',
            'body' => '',
            'active' => false,
            'usesubscriptionlist' => false,
            'useactionlist' => false,
        ));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function show($campaign)
    {
        //
        $clpGuid = config('appsettings.clpGUID');


        $data = new HomeCampaign($campaign);
        VisitManager::visit($campaign,"Home");
        return view("campaign",['Data' => $data]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */

    public function editor($campaign)
    {
        if(!Auth::check())
        {
            abort(404);
        }
        $user = auth()->user();

        
        $data = new EditCampaign($campaign,$user->guid);
        if($data->guid=="") about(404);
        return view("cplcampaign",['Data' => $data]);
    }

     public function edit($campaign)
    {
        //
        $ret = Campaign::where('guid',$campaign)->firstOrFail();

        ListsManager::owner($campaign)->AddLists($ret);

        $users = CampaignUser::where('campaign',$campaign)->get();
        $adminusers = array();
        foreach($users as $user)
        {
            $new = new \stdClass();
            $new->guid = $user->user;
            array_push($adminusers,$new);
        }
        $ret->adminusers = $adminusers;

        $t = TagOwner::where('owner',$campaign)->get();
        $tags = array();
        foreach($t as $tag)
        {
            $new = new \stdClass();
            $new->guid = $tag->tag;
            array_push($tags,$new);
        }
        $ret->tags = $tags;
        
        return $ret;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $campaign)
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
        $cmp = Campaign::where('guid',$campaign)->firstOrFail();

        switch($request->type)
        {
            case 'INFO':
                if(isset($request->title)) $cmp->title = $request->title;
                if(isset($request->subtitle)) $cmp->subtitle = $request->subtitle;
                if(isset($request->body)) $cmp->body = $request->body;
                if(isset($request->active)) $cmp->active = $request->active;
                if(isset($request->usesubscriptionlist)) $cmp->usesubscriptionlist = $request->usesubscriptionlist;
                if(isset($request->subscriptionlist)) $cmp->subscriptionlist = $request->subscriptionlist;
                if(isset($request->useactionlist)) $cmp->useactionlist = $request->useactionlist;
                if(isset($request->actionlist)) $cmp->actionlist = $request->actionlist;
                if(isset($request->dn)) $cmp->dn = $request->dn;
                break;
        }

        $cmp->save();

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


    public function dir($owner)
    {
        Log::info('Campaign DIR');

        $clpGuid = config('appsettings.clpGUID');

        //app('debugbar')->disable();

        $campaigns = Campaign::where("owner",$owner)->get();
        $c = array();
        foreach($campaigns as $campaign)
        {
            $new = new \stdClass();
            $new->key = $campaign->guid;
            $new->guid = $campaign->guid;
            $new->title = $campaign->title;
            $new->active = $campaign->active;
            

            $new->stats = StatsManager::owner($campaign->guid,$campaign->title,"/campaign/".$campaign->guid."/editor");

            array_push($c,$new);
        }
        
        return($c);
    }

    public function removeuser($campaign,$user)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');

        CampaignUser::where('user',$user)->where('campaign',$campaign)->delete();
        Log::info('Removing user '.$user.' as a campaign admin for '.$campaign);
    }

    public function adduser($campaign,$user)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');

        CampaignUser::create(array(
            'guid' => uniqid("CAU"),
            'campaign' => $campaign,
            'user' => $user
        ));

        Log::info('Adding user '.$user.' as a campaign admin user for '.$campaign);
    }


    public function removetag($campaign,$tag)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');
        TagManager::owner($campaign)->removetag($tag);
    }

    public function addtag($campaign,$tag)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }
        TagManager::owner($campaign)->addtag($tag);
    }
}
