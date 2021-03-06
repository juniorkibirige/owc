<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     if (Auth::check())
//         return redirect('/dashboard');
//     else return redirect('/login');
// });

//Route::view('/login', 'layouts.loginReg')->middleware('guest')->name('login');
//Route::view('/register', 'auth.register')->name('register')->middleware('guest');
//// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home')->middleware('auth');
Route::get('logout', [App\Http\Controllers\Auth\LoginController::class,'logout'])->name('logout')->middleware('auth');

Route::view('/{path?}', 'layouts/police_form');
Route::view('/{path?}/{path1?}/{path2?}/{path3?}', 'layouts/police_form');
