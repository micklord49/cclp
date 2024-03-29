<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use Illuminate\Http\Request;

use App\Contact;
use App\ContactList;
use App\ListContact;
use App\ContactOwner;
use App\ContactEvent;

use App\ViewModels\Home;
use App\ViewModels\ContactsIndex;
use App\ViewModels\Managers\TagManager;


class ContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clpGuid = config('appsettings.clpGUID');

        if(!Auth::check())
        {
            abort(404);
        }
        $user = auth()->user();
        $data = new ContactsIndex();
        return view("contacts",['Data' => $data]);
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
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */
    public function show($councillor)
    {
        //
        $clpGuid = config('appsettings.clpGUID');


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Contacts  $contact
     * @return \Illuminate\Http\Response
     */
    public function edit($contact)
    {
        if(Auth::check())
        {
            $user = auth()->user();
        }
        else {
            abort(404);
        }
        //
        $ret = Contact::where('guid',$contact)->firstOrFail();
        $ret->tags = TagManager::owner($contact)->tags();
        $ret->events = ContactEvent::where('contact',$contact)->orderBy('created_at','DESC')->get();
        return $ret;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Councillor  $councillor
     * @return \Illuminate\Http\Response
     */

    public function verify($guid)
    {
        //
        $contact = Contact::where("guid",$guid)->firstOrFail();

        if($contact->email_verified_at == null)
        {
            $contact->email_verified_at = Now();
            $contact->save();
        }

        $data = new Home();
        return view('thankyou',['Data' => $data]);
    }

    public function search($perpage,$page)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        
        app('debugbar')->disable();


        $data->data = Contact::where("clp",$clpGuid)->orderBy('created_at','DESC')->skip($perpage*($page-1))->take($perpage)->get();        
        $data->page = $page;
        $data->count = Contact::where("clp",$clpGuid)->count();
        foreach($data->data as $contact)
        {
            $firstcontact = new Carbon($contact->created_at);
            $contact->firstcontact = $firstcontact->toDateTimeString();
        }

        return(json_encode($data));
    }

    public function listsearch($owner,$perpage,$page)
    {
        $clpGuid = config('appsettings.clpGUID');

        $data = new \stdClass();
        $data->data = array(); 
        
        app('debugbar')->disable();

        $list = ContactList::where('guid',$owner)->firstOrFail();


        $data->data = $list->pagedcontacts($perpage,$page);        

        $data->page = $page;
        $data->count = ListContact::where("list",$owner)->count();
        foreach($data->data as $contact)
        {
            $firstcontact = new Carbon($contact->created_at);
            $contact->firstcontact = $firstcontact->toDateTimeString();
        }

        return(json_encode($data));
    }

    public function removetag($contact,$tag)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }

        $clpGuid = config('appsettings.clpGUID');
        TagManager::owner($contact)->removetag($tag);
    }

    public function addtag($contact,$tag)
    {
        if(Auth::check())
        {
        }
        else {
            abort(404);
        }
        TagManager::owner($contact)->addtag($tag);
    }



}
