<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Constituency extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

    protected $table = 'constituencies';
    protected $fillable = [
        'name',
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
