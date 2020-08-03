<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Http\Requests\ProfileRequest;
use App\Http\Requests\PasswordRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');

    }

    public function index() {
        $users = Admin::all();

        return response()->json($users);
    }
}
