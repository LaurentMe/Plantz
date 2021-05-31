<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlantUserResource;
use App\Models\Plant;
use App\Models\PlantUser;
use Carbon\Carbon;
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
        return response(PlantUserResource::collection(PlantUser::where('user_id', $request->user()->id)->orderBy('last_water_day')->get()), 200);
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
            'latinName' => 'required',
            'water' => 'required',
            'waterDays' => 'required',
            'location' => 'required',
            'image' => 'required',
            'description' => 'required',
        ]);

        try {
            $plant = Plant::where('latin_name', $request->latinName)->first();
            if ($plant === null) {
                $plant = Plant::create([
                    'latin_name' => $request->latinName,
                    'water_amount' => $request->water,
                    'days_between_water' => $request->waterDays,
                    'description' => $request->description

                ]);
                if ($request->name === null) {
                    $plant->name = $request->latinName;
                } else {
                    $plant->name = $request->name;
                }
                $plant->save();
            }
            $plantUser = PlantUser::create([
                'plant_id' => $plant->id,
                'user_id' => $request->user()->id,
                'location' => $request->location,
                'image' => $request->image,
                'nickname' => $plant->name,
                'last_water_day' => Carbon::now()->toDateTimeString(),
            ]);

            if ($request->nickname !== null) {
                $plantUser->nickname = $request->nickname;
            }
            $plantUser->save();

            return response([
                'plant' => $plant,
                'plantUser' => $plantUser
            ], 201);
        } catch (Exception $exception) {
            return response(['error' => $exception], 400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        return new PlantUserResource(PlantUser::where('user_id', $request->user()->id)->where('id', $id)->firstOrFail());
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
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        PlantUser::where('user_id', $request->user()->id)->where('id', $id)->delete();
        return response()->noContent(201);
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
//        $plant = Plant::where('latin_name', $response['suggestions'][0]['plant_name'])->first();
//        return response([
//            'plant_name' => $response['suggestions'][0]['plant_name'],
//            'plant' => $plant
//        ], 200);

        $plant = Plant::where('latin_name', 'Pilea peperomioides')->first();
        return response([
            'plant_name' => 'Pilea peperomioides',
            'plant' => $plant
        ], 200);
    }

    public function updateWater(Request $request, $id) {
        $plantUser = PlantUser::where('user_id', $request->user()->id)->where('id', $id)->firstOrFail();
        $plantUser->last_water_day = Carbon::now()->toDateTimeString();
        $plantUser->save();
        return new PlantUserResource(PlantUser::where('user_id', $request->user()->id)->where('id', $id)->firstOrFail());    }
}
