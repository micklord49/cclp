<?php

namespace App\ViewModels\Managers;

use App\Visit;

class VisitManager
{
    public static function visit($owner,$page)
    {
        $visit = new Visit;

        $visit->guid = uniqid("VST");
        $visit->owner = $owner;
        $visit->clp = config('appsettings.clpGUID');
        $visit->page = $page;
        $visit->save();
    }
}
