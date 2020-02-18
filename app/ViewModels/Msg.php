<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use App\User;
use App\Contact;
use App\ContactEvent;
use App\Message;
use App\Cclp;

use Notification;
use App\Notifications\NewMessage;
use Illuminate\Notifications\Notifiable;



class Msg
{
    //
    public $owner = "";
    public $name = "";
    public $email = "";
    public $subject = "";
    public $message = "";
    public $status = "";
    public $category = "";
    public $event = "";

    public function __construct()
    {
    }

    public function store()
    {
        $from = "";

        $this->email = strtolower($this->email);
        $contacts = Contact::where('email',$this->email)->first();
        if(empty($contacts))
        {
            //  Insert a new contact
            $from = uniqid("CNT");
            Contact::create(array(
                'guid' => $from,
                'name' => $this->name,
                'email' => $this->email,
            ));            
        }
        else
        {
            $from = $contacts->guid;
        }
        $msg = uniqid("MSG");
        Message::create(array(
            'guid' => $msg,
            'from' => $from,
            'to' => $this->owner,
            'subject' => $this->subject,
            'message' => $this->message,
            'status' => $this->status,
            'category' => $this->category,
        ));
        ContactEvent::create(array(
            'guid' => uniqid("CEV"),
            'contact' => $from,
            'event' => $this->event,
        ));

        //
        //  Notify account owner
        switch(substr($this->owner,0,3))
        {
            case "CLP":
                //Cclp::where('guid',$this->owner)->firstOrFail()->notify(new NewMessage($this->email));
        }

    }

}

