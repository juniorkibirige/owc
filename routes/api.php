<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
// Auth::routes();
Route::get('form_105', 'FormsController@index');
Route::post('/login', 'Auth\AuthController@login')->name('login.api');
Route::post('/register', 'Auth\AuthController@register')->name('register.api');
Route::post('/logout', 'Auth\AuthController@logout')->name('logout.api');

// Route::get('form_105', 'FormsController@index');
Route::post('form_105', 'FormsController@store');
Route::get('form_105/{id}', 'FormsController@show');
// Route::post('login', [
//     AccessTokenController::class, 'issueToken'
// ])
//     ->middleware([
//         'api-login', 'throttle'
//     ]);
