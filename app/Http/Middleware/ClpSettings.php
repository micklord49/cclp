<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\DB;

use App\AppSettings;

use Closure;

class ClpSettings 
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $clpGuid = "";
        $siteType = "CLP";
        

        $clps = DB::select('select * from cclps where dn=?',[ $_SERVER['HTTP_HOST']]);
        if(count($clps) == 0)
        {
            $clps = DB::select('select * from dn_aliases where dn=?',[$_SERVER['HTTP_HOST']]);
            if(count($clps) == 0)
            {
                $clps = DB::select('select * from cclps where dn=?',['localhost']);
                if(count($clps) == 0)
                {
                    $clpsGUID = '****';
                }
                else
                {
                    $clpGuid = $clps[0]->guid;
                }
            }
            else
            {
                $clpGuid = $clps[0]->clp;
            }
        }
        else
        {
            $clps = DB::select('select * from cclps');
            $clpGuid = $clps[0]->guid;
            $siteType = "CLP";
        }

        config(['appsettings.clpGUID' => $clpGuid]);
        config(['appsettings.siteType' => $siteType]);

        
        return $next($request);
    }
}
