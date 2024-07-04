<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'contract_id',
        'amount',
        'due_date',
        'paid_date',
    ];

    protected $casts = [
        'due_date' => 'date',
        'paid_date' => 'date',
    ];


    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }
    public function isPending()
    {
        return $this->paid_date === null;
    }
}
