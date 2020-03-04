<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use App\ViewModels\Userdir;
use App\ViewModels\ImageFile;
use App\User;
use App\Social;

class SocialController extends Controller
{
    public function load($owner)
    {
        return Social::firstOrNew([ 'owner' => $owner]);
    }

    public function save(Request $request)
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
        $social = Social::firstOrNew([ 'owner' => $request->owner]);

        if($social->guid=="")
        {
            $social->guid=uniqid("SOC");
            $social->owner=$request->owner;
        }

        try 
        {
            switch($request->type)
            {
                case 'FACEBOOK':
                    $social->facebook = $request->facebook ?? '';
                    break;
                case 'INSTAGRAM':
                    $social->instagram = $request->instagram ?? '';
                    break;
                case 'TWITTER':
                    $social->twitter = $request->twitter ?? '';
                    break;
                case 'YOUTUBE':
                    $social->youtube = $request->youtube ?? '';
                    break;
                case 'INSTAGRAM':
                    $social->tumblr = $request->tumblr ?? '';
                    break;
            }
        }
        catch(Exception $e)
        {
            report($e);
        }

        $social->save();
    }

}
