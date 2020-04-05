<?php

namespace App\ViewModels\Managers;

use App\Social;

class SocialManager
{
    public static function owner($guid)
    {
        return new ISocialOwner($guid);
    }
}

class ISocialOwner
{
    private $owner;

    public function __construct($owner)
    {
        $this->owner = $owner;
    }

    public function addlinks(&$obj)
    {
        $social = Social::where("owner",$this->owner)->first();
        if(isset($social->facebook)) 
        {
            if($social->facebook != "") $obj->facebook = $this->sanitize($social->facebook);
        }
        if(isset($social->twitter)) 
        {
            if($social->twitter != "") $obj->twitter = "https://twitter.com/".$social->twitter;
            $obj->twitterfeed = $social->twitterfeed;
        }
        if(isset($social->youtube))
        {
            if($social->youtube != "") $obj->youtube = $this->sanitize($social->youtube);
        }
        if(isset($social->instagram))
        {
            if($social->instagram != "") $obj->instagram = $this->sanitize($social->instagram);
        }
        if(isset($social->tumblr))
        {
            if($social->tumblr != "") $obj->tumblr = $this->sanitize($social->tumblr);
        }
    }

    private function sanitize($url)
    {
        //
        $url = strtolower($url);
        if(substr($url,0,4) != "http")   $url = "https://" . $url;
        return $url;
    }

}


