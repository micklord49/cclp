<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\ViewModels\Home;
use App\ViewModels\HomeBranches;
use App\ViewModels\HomeWards;
use App\ViewModels\Dashboard;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $data = new Dashboard();
        return view('home',['Data' => $data]);
    }

    public function branches()
    {
        $data = new HomeBranches();
        return view('home',['Data' => $data]);
    }

    public function wards()
    {
        $data = new HomeWards();
        return view('home',['Data' => $data]);
    }

}
