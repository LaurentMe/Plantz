<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlantUser extends Model
{
    use HasFactory;

    protected $table = 'plant_user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'plant_id',
        'user_id',
        'location',
        'nickname',
        'image',
        'last_water_day',
        'custom_water_amount',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [

    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [

    ];

    public function users(){
        return $this->belongsToMany(User::class, 'plant_user');
    }
    public function plants(){
        return $this->belongsToMany(Plant::class);
    }

}
