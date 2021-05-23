<?php

namespace App\Http\Controllers;

use App\Models\Plant;
use App\Models\PlantUser;
use Illuminate\Http\Request;
use Mockery\Exception;

class PlantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
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
            'location' => 'required'
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
                'nickname' => $request->nickname
            ]);

            return response([
                'plant' => $plant,
                'plantUser' => $plantUser
            ], 201);
        } catch (Exception $exception) {

        }

        return response([
            'plant' => $request
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
