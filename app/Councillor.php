<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Councillor extends Model
{
    use Notifiable;
    
    //
    protected $fillable = [
        'clp', 'guid', 'ward', 'owner', 'intro', 'branch'
    ];

    protected $attributes = [
        'dn' => '',
        'intro' => '',
        'branch' => '',
        'ward' => '',
        'brandAsClp' => 1,
        'active' => false,
        'campaign' => false,
     ];

     public function routeNotificationForMail($notification)
     {
        if($this->email != "")      return $this->email;

        $users = User::where('guid',$this->owner)->get();
        $emailaddress = "";
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
