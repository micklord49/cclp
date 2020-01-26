<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\ViewModels\ImageFile;
use App\Image;


class ImageController extends Controller
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
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function show($request)
    {
        //
        $filename = "images/".$request;
        Log::debug("Getting ".$filename);
        if(!Storage::exists($filename)) {
            Log::debug("Unable to find file ".$request);
            abort(404);
        }
    
        $file = Storage::get($filename);
        $type = Storage::mimeType($filename);
    
        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);
    
        return $response;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Wards  $ward
     * @return \Illuminate\Http\Response
     */
    public function edit($ward)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $ward)
    {

    }



    
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function destroy($councillor)
    {
        //
    }

    public function imageUploadPost()
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
            Log::debug("No filename returned - so using default user image");
            switch(substr($id,0,3))
            {
                case "USR":
                    $image->filename="/images/defaultuser.png";
                    break;
                case "CLR":
                    $image->filename="/images/defaultuser.png";
                    break;
                case "BLG":
                    $image->filename="/images/defaultpost.png";
                    break;
                default:
                    $image->filename="/images/defaultuser.png";
                    break;
            }
        }
        else
        {
            $image->canedit = true;
        }
        $image->canchange = true;
        return $image;
    }


    public function image($id)
    {

        $clpGuid = config('appsettings.clpGUID');
        $image = new ImageFile($id);        

        if($image->filename=="")
        {
            Log::debug("No filename returned - so using default user image");
            switch(substr($id,0,3))
            {
                case "USR":
                    $image->filename="/images/defaultuser.png";
                    break;
                case "CLR":
                    $image->filename="/images/defaultuser.png";
                    break;
                default:
                    $image->filename="/images/defaultuser.png";
                break;
            }
        }
        return response()->download(
            storage_path($image->filename), 
            '$image->filename',
            ['Content-Type' => 'image/jpg']
        );
    
    }



    public function changeimage(Request $request,$id)
    {

        $newimage = uniqid("IMG");
        $owner = $id;
        if($request->hasFile('image')==false)
        {
            abort(411,"No image in request");
        }

        $clpGuid = config('appsettings.clpGUID');
        $images = Image::where('owner',[$owner])->get();
        if(count($images) == 0)
        {
            $path = request()->file('image')->store('images');
            Image::create(array('guid' => $newimage,
            'owner' => $owner,
            'path' => $path));
        }
        else
        {
            $i = $images[0];
            Storage::disk('images')->delete($i->path);            
            $path = request()->file('image')->store('images');
            $i->path = $path;
            $i->save();
        }

        return;
    }

}
