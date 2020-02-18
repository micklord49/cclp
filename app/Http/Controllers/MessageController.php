<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

use App\ViewModels\Home;
use App\ViewModels\Userdir;
use App\ViewModels\ImageFile;
use App\ViewModels\Msg;
use App\User;
use App\Contact;
use App\Message;

class MessageController extends Controller
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
    public function edit($guid)
    {
        Log::info('Creating Userdir for '.$user);
        $msg = Message::where($guid);

        return($u);
    }

    public function search($owner,$perpage,$page)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        
        app('debugbar')->disable();


        $data->data = Message::select('guid','from','to','subject','message')->where("to",$owner)->skip($perpage*($page-1))->take($perpage)->get();        
        $data->page = $page;
        $data->count = User::where("clp",$clpGuid)->count();
        foreach($data->data as $msg)
        {
            $contact = Contact::where('guid',$msg->from)->firstOrFail();
            $msg->fromemail=$contact->email;
            $msg->fromname=$contact->name;
            $msg->from=$contact->name . ' [' . $contact->email . ']';
        }

        return(json_encode($data));
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


    public function newmessage(Request $request,$owner)
    {
        Log::info('Inserting new message for the clp ');
        Log::info($request);

        $msg = new Msg();
        
        $msg->owner = $owner;
        $msg->name = $request->msgname;
        $msg->email = $request->msgemail;
        $msg->subject = "Home Page Question";
        $msg->message = $request->msgmessage;
        $msg->status = "unread";
        $msg->category = "message";
        $msg->event = "CLP Message";

        $msg->store();

        $data = new Home();
        return view('thankyou',['Data' => $data]);

    }
}
