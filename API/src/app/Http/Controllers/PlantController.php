<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlantUserResource;
use App\Models\Plant;
use App\Models\PlantUser;
use Illuminate\Http\Client\Factory;
use Illuminate\Http\Request;
use Mockery\Exception;

class PlantController extends Controller
{
    private $requestFactory;

    public function __construct(Factory $requestFactory)
    {
        $this->requestFactory = $requestFactory;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response(PlantUserResource::collection(PlantUser::where('user_id', $request->user()->id)->get()), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'latinName' => 'required',
            'nickname' => 'required',
            'water' => 'required',
            'waterDays' => 'required',
            'location' => 'required',
            'image' => 'required',
        ]);

        try {
            $plant = Plant::create([
                'name' => $request->name,
                'latin_name' => $request->latinName,
                'water_amount' => $request->water,
                'days_between_water' => $request->waterDays
            ]);

            $plantUser = PlantUser::create([
                'plant_id' => $plant->id,
                'user_id' => $request->user()->id,
                'location' => $request->location,
                'nickname' => $request->nickname,
                'image' => $request->image,
            ]);

            return response([
                'plant' => $plant,
                'plantUser' => $plantUser
            ], 201);
        } catch (Exception $exception) {
            return response(['error' => $exception], 400);
        }


        return response([
            'plant' => $request
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    public function searchPlant(Request $request)
    {
//        $response = $this->requestFactory
//            ->baseUrl('https://api.plant.id')
//            ->post('/v2/identify', [
//                'api_key' => env('PLANT_ID_KEY'),
//                'images' => [
//                    $request->image
//                ],
//                'plant_language' => "nl"
//            ]);
//        if ($response->getStatusCode() === 200) {
//            return response([
//                'plant_name' => $response['suggestions'][0]['plant_name']
//            ], 200);
//        } else {
//            return response('Bad request', 400);
//        }

//        $response = $this->requestFactory
//            ->baseUrl('https://api.plant.id')
//            ->post('/v2/identify', [
//                'api_key' => env('PLANT_ID_KEY'),
//                'images' => [
//                    $request->image
//                ],
//                'plant_language' => "nl"
//            ]);

//        $response = $this->requestFactory
//            ->baseUrl('https://api.plant.id')
//            ->post('/v2/identify', [
//                'api_key' => env('PLANT_ID_KEY'),
//                'images' => [
//                    $request->image
//                ],
//                'plant_language' => "nl"
//            ]);
//        $plant = Plant::where('latin_name', $response['suggestions'][0]['plant_name'])->first();
//        return response([
//            'plant_name' => $response['suggestions'][0]['plant_name'],
//            'plant' => $plant
//        ], 200);

        $plant = Plant::where('latin_name', 'Pilea peperomasdfasioides')->first();
        return response([
            'plant_name' => 'Pilea peperomioides',
            'plant' => $plant
        ], 200);
    }
}
