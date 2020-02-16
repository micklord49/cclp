<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;


class Cclp extends Model
{
    use Notifiable;

    //
    protected $attributes = [
     ];

     public function routeNotificationForMail($notification)
     {
        $emailaddress = "";

        $users = User::where('clp',$this->guid)->role('Edit CLP')->get();
        foreach($users as $user)
        {
            if($user->email != "")
            {
                if($emailaddress!="")   $emailaddress += ";";
                $emailaddress += $user->email;
            }
        }
       return $emailaddress;
     }
   

}
