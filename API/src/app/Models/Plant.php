<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $fillable = [
        'name',
        'latin_name',
        'water_amount',
        'days_between_water',
    ];

    public function users(){
        return $this->belongsToMany(User::class);
    }
}
