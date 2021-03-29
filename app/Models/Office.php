<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Office extends Model
{
    use CrudTrait;

    use HasFactory;

    protected $table = 'offices';
    protected $guarded = ['id'];
    protected $fillable = [
        'name',
        'email',
        'address',
        'phone_number',
        'slug',
        'district_id',
        'constituency_id',
        'region_id'
    ];

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function county(): BelongsTo
    {
        return $this->belongsTo(Constituency::class);
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

}
