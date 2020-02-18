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
        $emailaddress = array();

        $users = User::where('clp',$this->guid)->permission('Edit CLP')->get();
        foreach($users as $user)
        {
            if($user->email != "")
            {
                //if($emailaddress!="")   $emailaddress .= ";";
                array_push($emailaddress,$user->email);
            }
        }
       return $emailaddress;
     }
   

}
