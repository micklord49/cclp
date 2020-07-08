<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

use App\ViewModels\Home;
use App\ViewModels\Userdir;
use App\ViewModels\ImageFile;
use App\ViewModels\Msg;
use App\ViewModels\Managers\TagManager;
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
    public function show($message)
    {
        $msg = Message::where('guid',$message)->firstOrFail();
        if($msg->status == "unread")
        {
            $msg->status = "read";
            $msg->save();
        }
        
        $contact = Contact::where('guid',$msg->from)->firstOrFail();
        $msg->fromtags = TagManager::owner($msg->from)->tags();
        $msg->fromemail=$contact->email;
        $msg->fromname=$contact->name;
        $msg->fromguid=$msg->from;
        $msg->from=$contact->name . ' [' . $contact->email . ']';

        $recieved = new Carbon($contact->created_at);
        $msg->created_at = $recieved->toDateTimeString();


        return($msg);
    }

    /**
     * Show the form for editing the specified resource.
     *
     */
    public function edit($guid)
    {
    }

    public function search($owner,$perpage,$page)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        
        app('debugbar')->disable();


        $data->data = Message::select('guid','from','to','subject','message','status','created_at')->where("to",$owner)->orderBy('created_at','DESC')->skip($perpage*($page-1))->take($perpage)->get();        
        $data->page = $page;
        $data->count = User::where("clp",$clpGuid)->count();
        foreach($data->data as $msg)
        {
            $contact = Contact::where('guid',$msg->from)->firstOrFail();
            $msg->fromemail=$contact->email;
            $msg->fromname=$contact->name;
            $msg->from=$contact->name . ' [' . $contact->email . ']';

            Log::debug($msg);
            $d = $msg->created_at->format('H:i');
            $recieved = new Carbon($msg->created_at);
            $t = $recieved->timestamp;
            $msg->received = $d.' '.$this->get_day_name($t);
        }

        return(json_encode($data));
    }

    function get_day_name($timestamp) {

        $date = date('d/m/Y', $timestamp);
    
        if($date == date('d/m/Y')) {
          $date = 'Today';
        } 
        else if($date == date('d/m/Y',time() - (24 * 60 * 60))) {
          $date = 'Yesterday';
        }
        Log::debug($date);
        return $date;
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
