<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class OffenseType extends Model
{
    use Notifiable;

    protected $fillable = [
        'name'
    ];
}
