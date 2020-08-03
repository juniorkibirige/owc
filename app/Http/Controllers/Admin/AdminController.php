<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Http\Requests\UserRequest;
use Facade\FlareClient\View;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    public function __construct() {
        $this->middleware('auth:admin');
    }
    /**
     * Display a listing of the users
     *
     * @param  \App\User  $model
     * @return \Illuminate\View\View
     */
    public function index(Admin $model)
    {
        return view('dashboard');
    }
}
