<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\ViewModels\Managers\SocialManager;

class Candidate extends Model
{
    //
    protected $fillable = [
        'clp', 'guid', 'owner', 'intro', 
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

     public function card()
     {
        $ret = new \stdClass();
         
        $user = User::where('guid',$this->owner)->firstOrFail();
        $ret->name = $user->name;
        $ret->guid = $this->guid;
        $ret->title = $this->campaign ? 'Parliamentary Candidate' : 'Member of Parliament';
        $ret->intro = $this->intro;
        SocialManager::owner($this->guid)->addlinks($ret);
        return $ret;

     }


}
