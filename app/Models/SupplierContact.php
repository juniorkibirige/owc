<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierContact extends Model
{
    use CrudTrait;
    use HasFactory;
    protected $table = 'supplier_contacts';
    protected $guarded = ['id'];
    protected $fillable = [
        'email',
        'phone_number',
        'address',
    ];
}
