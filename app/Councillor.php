<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Councillor extends Model
{
    use Notifiable;
    
    //
    protected $fillable = [
        'clp', 'guid', 'ward', 'owner', 'intro'
    ];

    protected $attributes = [
        'dn' => '',
        'intro' => '',
        'brandAsClp' => 1,
        'active' => false,
        'campaign' => false,
     ];

     public function routeNotificationForMail($notification)
     {
        if($this->email != "")      return $email;

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
