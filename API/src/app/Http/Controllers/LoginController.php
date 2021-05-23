<?php

namespace App\Http\Controllers;

use App\Models\User;
use Cassandra\Exception\ValidationException;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Mockery\Exception;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = User::where('email', $request->email)->first();

            return response([
                'user' => $user,
                'token' => $user->createToken($request->device_name)->plainTextToken
            ], 200);
        }
        else
        {
            return response('', 401);
        }
    }

    public function register(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required'
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);

            return response([
                'user' => $user,
                'token' => $user->createToken($request->device_name)->plainTextToken
            ], 201);
        } catch (Exception $exception) {
            return response([
                'error' => 'Username already exists'
            ], 402);
        }

    }
}
