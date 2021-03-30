<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class District extends Model
{

    protected $table = 'districts';

    protected $fillable = [
        'name',
    ];

    public $timestamps = [
        'created_at',
        'updated_at'
    ];

    public function supplier(): BelongsToMany
    {
        return $this->belongsToMany(Supplier::class);
    }
}
