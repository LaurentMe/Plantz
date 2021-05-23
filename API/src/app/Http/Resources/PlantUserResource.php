<?php

namespace App\Http\Resources;

use App\Models\Plant;
use Illuminate\Http\Resources\Json\JsonResource;

class PlantUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'location' => $this->location,
            'nickname' => $this->nickname,
            'image' => $this->image,
            'plant' => Plant::where('id', $this->plant_id)->first(),
        ];
    }
}
