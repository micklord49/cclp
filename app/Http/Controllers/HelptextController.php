<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helptext;



class HelptextController extends Controller
{
    public function __invoke($id)
    {
        $help = Helptext::where('name',$id)->first();
        return $help;
    }

}
