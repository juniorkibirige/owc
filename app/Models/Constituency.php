<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Constituency extends Model
{

    protected $table = 'constituencies';
    protected $fillable = [
        'name',
        'slug'
    ];

    protected $guarded = [
        'id',
        'slug'
    ];

    public function getSlugAttribute($value): string
    {
        return strtolower(implode('_', explode(' ', $this->attributes['name'])));

    }
}
