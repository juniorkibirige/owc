<?php

namespace App\Http\Controllers\Admin;

use App\Admin;
use App\Http\Controllers\Controller;
use Illuminate\View\View;

class AdminController extends Controller
{

    public function __construct() {
        $this->middleware('auth:admin');
    }

    /**
     * Display a listing of the users
     *
     * @param Admin $model
     * @return View
     */
    public function index(Admin $model)
    {
        return view('dashboard');
    }
}
