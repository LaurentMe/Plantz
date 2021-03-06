<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PlantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('plants', PlantController::class);
});

Route::post('/searchPlant', [PlantController::class, 'searchPlant']) -> middleware('auth:sanctum');
Route::get('/updateWater/{id}', [PlantController::class, 'updateWater']) -> middleware('auth:sanctum');
