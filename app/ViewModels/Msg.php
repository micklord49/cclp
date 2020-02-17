<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;

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

    public function __construct($owner)
    {
        $this->owner = $owner;
    }

    public function store()
    {
        $to = "";

        $this->email = strtolower($this->email);
        $contacts = Contact::where('email',$this->email)->get();
        if(count($contacts)==0)
        {
            //  Insert a new contact
        }
        else
        {
            $to = $contacts[0]->guid;
        }
    }

}

