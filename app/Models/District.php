<?php

namespace App\Models;

use App\Http\Traits\HasPermissionsTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class District extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

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
