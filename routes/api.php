<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

 Route::middleware('auth:api')->get('/user', function (Request $request) {
         return $request->user();
    });
// Auth::routes();
 Route::post('/login', 'Auth\AuthController@login')->name('login.api');
// Route::post('/register', 'Auth\AuthController@register')->name('register.api');
 Route::post('/logout', 'Auth\AuthController@logout')->name('logout.api');
 Route::group(['middleware' => ['auth:api', 'json.response']], function (){
     Route::resource('supplier', 'SupplierController')->except([
         'edit', 'create'
     ]);
     Route::resource('input', 'InputController')->except([
         'edit', 'create'
     ]);
     Route::resource('beneficiary', 'BeneficiaryController')->except([
         'edit', 'create'
     ]);
 });
