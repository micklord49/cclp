<?php

namespace App\ViewModels;


use Illuminate\Database\Eloquent\Model;


class ContactsIndex extends Model
{
    //

    public $guid;
    public $menu;

    public function __construct()
    {
        $clpGuid = config('appsettings.clpGUID');
        $this->guid = $clpGuid;

        $this->menu = new Menu($clpGuid);
    }

}
