<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\ContactList;
use App\ListContact;
use App\Contact;
use App\ContactEvent;
use App\ViewModels\Managers\TagManager;
use App\ViewModels\Home;

use App\Notifications\ConfirmEmail;

class ListController extends Controller
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
        Log::debug($request);
        if($request->guid!="")
        {
            //  Update blog post
            $list = ContactList::where('guid',$request->guid)->firstOrFail();    
            if(isset($request->type))     $list->type=$request->type;
            if(isset($request->description))     $list->description=$request->description;
            if(isset($request->requestaddress))     $list->requestaddress=$request->requestaddress;
            if(isset($request->requireaddress))     $list->requireaddress=$request->requireaddress;
            if(!isset($request->requestaddress))     $list->requestaddress=0;
            if(!isset($request->requireaddress))     $list->requireaddress=0;
        }
        else
        {
            //  Create list
            $list = new ContactList;
            $list->guid = uniqid("LST");
            $list->owner=$request->owner;
        }
        if(isset($request->title))     $list->title=$request->title;
        if(isset($request->subtitle))     $list->subtitle=$request->subtitle;
        $list->save();        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function show($guid)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit($guid)
    {
        $list = ContactList::where('guid',$guid)->firstOrFail();
        return $list->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $blog)
    {
        //
        $this->store($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function destroy($branch)
    {
        //
    }

    public function ownersearch($perpage,$page,$owner)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        
        app('debugbar')->disable();


        $data->data = ContactList::select('guid','type','title','subtitle')->where("owner",$owner)->skip($perpage*($page-1))->take($perpage)->get();
        foreach($data->data as $list)
        {
            $list->contactscount = ListContact::where('list',$list->guid)->count();
        }
        $data->page = $page;
        $data->count = ContactList::where("owner",$owner)->count();

        return(json_encode($data));
    }

    public function sign(Request $request,$guid)
    {
        $clpGuid = config('appsettings.clpGUID');

        app('debugbar')->disable();

        $contactlist = ContactList::where("guid",$guid)->firstOrFail();
        $email = strtolower($request->email);

        $contact = Contact::where('email',$email)->first();
        if(empty($contact))
        {
            //  Insert a new contact
            $from = uniqid("CNT");
            $contact = Contact::create(array(
                'guid' => $from,
                'name' => $request->name,
                'email' => $request->email,
                'address1' => $request->address1 ?? '',
                'address2' => $request->address2 ?? '',
                'clp' => $clpGuid,
                ));            
        }
        else
        {
            $from = $contact->guid;
            if(isset($request->address1))       $contact->address1=$request->address1;
            if(isset($request->address2))       $contact->address2=$request->address2;
            $contact->save();
        }

        $listc = ListContact::where('list',$guid)->where('contact',$from)->count();
        if($listc>0)
        {
            $data = new Home();
            $message = "THANK YOU";
            switch($contactlist->type)
            {
                case 1:     
                    $message = "You have already subscribed to this list.";
                    break;
                case 2:     
                    $message = "You have already signed this petition.";
                    break;
                case 3:     
                    $message = "You have already signed this open letter.";
                    break;
            }
            $data->msg = $message;
            return view('thankyou',['Data' => $data]);
        }

        $contact = ListContact::create(array(
            'guid' => uniqid("LCT"),
            'list' => $guid,
            'contact' => $from,
        ));            


        $event = "LIST";
        $message = "THANK YOU";

        switch($contactlist->type)
        {
            case 1:     
                $event = "Added to Subscription List ".$contactlist->title;
                $message = "Thank you for signing up to ".$contactlist->subtitle;
                break;
            case 2:     
                $event = "Signed Petition ".$contactlist->title;
                $message = "Thank you for signing ".$contactlist->subtitle;
                break;
            case 3:     
                $event = "Signed Open Letter ".$contactlist->title;
                $message = "Thank you for signing ".$contactlist->subtitle;
                break;
        }

        ContactEvent::create(array(
            'guid' => uniqid("CEV"),
            'contact' => $from,
            'event' => $event,
        ));

        foreach(TagManager::owner($guid)->tags() as $tag)
        {
            TagManager::owner($from)->addtag($tag->guid);
        }

        if($contact->email_verified_at==null)
        {
            $contact->notify(new ConfirmEmail($guid));
        }

        $data = new Home();
        $data->msg = $message;
        return view('thankyou',['Data' => $data]);

    }
}
