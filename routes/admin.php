<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'Auth',
], function () {
    // Authentication Routes...
    Route::get('login', 'LoginController@showLoginForm')->name('login_page');
    Route::post('login', 'LoginController@login')->name('login');
    Route::post('logout', 'LoginController@logout')->name('logout');
});

Route::group([
    'middleware' => [
        'auth:admin',
    ],
], function () {
    // for all admins
    Route::get('/', 'AdminController@index')->name('dashboard');
    Route::get('home', 'AdminController@index')->name('dashboard');
    Route::get('dashboard', 'AdminController@index')->name('dashboard');

    Route::group(['middleware' => ['role:administrator']], function() {

    });

    Route::group(['middleware' => ['role:administrator|moderator']], function() {
        Route::group(['prefix' => 'settings'], function () {
            Route::get('all', 'UsersController@index')->name('index');
        });
    });

    Route::group(['middleware' => ['role:administrator|moderator|manager']], function() {

    });
});