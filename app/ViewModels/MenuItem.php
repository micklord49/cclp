<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;

class MenuItem
{
    //
    public $Title = "";
    public $URL = "";
    public $Enabled = false;
    public $Icon = null;
    public $IconOnly = false;
    public $jsid = 0;

    public $SubItems = null;

    private static $refctr = 0;

    public function __construct($title,$url,$enabled,$icon = null,$icononly = false)
    {
        $this->Title = $title;
        $this->URL = $url;  
        $this->Enabled = $enabled;      
        $this->Icon = $icon;
        $this->IconOnly = $icononly;
        $this->jsid = self::$refctr++;
    }

    public function AddSubItem($title,$url,$enabled,$icon = null,$icononly = false)
    {
        if($this->SubItems == null)
        {
            $this->SubItems = [ new MenuItem($title,$url,$enabled,$icon,$icononly) ];
        }
        else
        {
            array_push($this->SubItems,new MenuItem($title,$url,$enabled,$icon,$icononly));
        }
    }

    public function AddSubMenu($menuitem)
    {
        if($this->SubItems == null)
        {
            $this->SubItems = [ $menuitem ];
        }
        else
        {
            array_push($this->SubItems,$menuitem);
        }
    }
}

