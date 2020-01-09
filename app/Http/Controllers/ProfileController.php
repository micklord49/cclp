<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\ViewModels\EditProfile;
use App\User;


class ProfileController extends Controller
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
            $data = new EditProfile();
            return view('profile',['Data' => $data]);
            }
        else {
            abort(404);
        }
    }

    public function edit($id)
    {
        if(Auth::check())
        {
            return auth()->user();
        }

        abort(404);
    }

    public function update(Request $request,$id)
    {
        if(Auth::check())
        {
            $user = auth()->user();
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');
        $user = User::where('guid',$clpGuid)->first();

        switch($request->type)
        {
            case 'INFO':
                $user->name = $request->name ?? '';
                $user->about = $request->about ?? '';
                $user->birthdate = $request->birthdate;
                $user->hidebirthdate = $request->hidebirthdate;
                $user->telephone = $request->telephone ?? '';
                $user->publicemail = $request->publicemail ?? '';
                break;
            case 'SOCIAL':
                $user->facebook = $request->facebook ?? '';
                $user->instagram = $request->instagram ?? '';
                $user->twitter = $request->twitter ?? '';
                $user->youtube = $request->youtube ?? '';
                $user->tumblr = $request->tumblr ?? '';
                break;
        }

        $user->save();


    }

}