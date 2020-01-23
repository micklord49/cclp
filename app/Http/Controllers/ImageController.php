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
}
