<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Campaign;
use App\CampaignUser;

class EditCampaign extends Model
{
    //

    public $guid;
    public $menu;

    public function getguidAttribute()
    {
        return $this->guid;
    }


    public function __construct($campaign,$user)
    {
        $clpGuid = config('appsettings.clpGUID');
        $br = Campaign::where('guid',$campaign)->firstOrFail();
        if($br->owner != $user)
        {
            //$admin = CampaignUser::where('user',$user)->where('campaign',$campaign)->firstOrFail();
        }

        $this->guid = $br->guid;
        $this->menu = new Menu($clpGuid);
    }
}
