<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\ViewModels\EditProfile;
use App\ViewModels\ImageFile;
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

    public function show($id)
    {
        if(Auth::check())
        {
            $data = new EditProfile($id);
            return view('profile',['Data' => $data]);
        }

        abort(404);
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
        $user = User::where('guid',$id)->first();

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

    public function imagefile($id)
    {
        if(Auth::check())
        {
            $user = auth()->user();
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');
        $image = new ImageFile($id);
        if($image->filename=="")
        {
            $image->filename="/images/defaultuser.png";
        }
        else
        {
            $image->canedit = true;
        }
        $image->canchange = true;
        return $image;
    }

    public function changeimage()
    {

        request()->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $newimage = uniqid("IMG");
        $owner = request()->owner;

        $path = request()->file('image')->store('images');

        Image::create(array('guid' => $newimage,
        'owner' => $owner,
        'path' => $path));
        
        return back()
            ->with('success','You have successfully upload image.')
           ->with('image',$imageName);
    }


}