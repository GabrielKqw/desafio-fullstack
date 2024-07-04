<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'quotas',
        'storage',
    ];

    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
    public function isActiveInAnyContract()
    {
        return $this->contracts()->where('active', true)->exists();
    }
}
