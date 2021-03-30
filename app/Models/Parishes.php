<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parishes extends Model
{
    protected $table = 'parishes';
    protected $primaryKey = 'id';
    protected $guarded = 'id';
    protected $fillable = ['name'];
}
