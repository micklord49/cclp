<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Campaign extends Model
{
    use Notifiable;

    //
    protected $fillable = [
        'guid', 'title', 'subtitle', 'body', 'dn', 'owner'
    ];

    protected $attributes = [
        'actionlist' => '',
        'subscriptionlist' => '',
     ];

    public function tags()
    {
        return $this->hasMany('App\TagOwner','owner','guid');
    }

    public function routeNotificationForMail($notification)
    {
        $emailaddress = array();

        $campaignusers = CampaignUser::where('campaign',$this->guid)->get();
        foreach($campaignusers as $campaignuser)
        {
            $users = User::where('guid',$campaignuser->user)->get();
            foreach($users as $user)
            {
                if($user->email != "")
                {
                    //if($emailaddress!="")   $emailaddress .= ";";
                    array_push($emailaddress,$user->email);
                }
            }
        }
        return $emailaddress;
    }

}
