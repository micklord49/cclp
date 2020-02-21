<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use App\User;
use App\Contact;
use App\ContactEvent;
use App\Message;
use App\Cclp;
use App\Branch;
use App\Campaign;

use App\ViewModels\TagManager;

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
        $contact = Contact::where('email',$this->email)->first();
        if(empty($contact))
        {
            //  Insert a new contact
            $from = uniqid("CNT");
            $contact = Contact::create(array(
                'guid' => $from,
                'name' => $this->name,
                'email' => $this->email,
                ));            
        }
        else
        {
            $from = $contact->guid;
        }
        $msg = uniqid("MSG");
        $newmessage = Message::create(array(
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

                
        $newmessage->fromemail=$contact->email;
        $newmessage->fromname=$contact->name;
        $newmessage->from=$contact->name . ' [' . $contact->email . ']';

        foreach(TagManager::owner($this->owner)->tags() as $tag)
        {
            TagManager::owner($from)->addtag($tag->guid);
        }

        //
        //  Notify account owner
        try {
            switch(substr($this->owner,0,3))
            {
                case "CLP":
                    Cclp::where('guid',$this->owner)->firstOrFail()->notify(new NewMessage($newmessage));                    
                    break;
                case "CMP":
                    Campaign::where('guid',$this->owner)->firstOrFail()->notify(new NewMessage($newmessage));                    
                    break;
                case "BRC":
                    Branch::where('guid',$this->owner)->firstOrFail()->notify(new NewMessage($newmessage));                    
                    break;
            }
        } catch (Throwable $th) {
            //throw $th;
        }

    }

}

