<?php

namespace App\Http\Controllers;

use App\Models\User;
use Cassandra\Exception\ValidationException;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            ], 201);
        }
        else
        {
            return response('', 401);
        }
//        $user = User::where('email', $request->email)->first();
//
//        if (! $user || ! Hash::check($request->password, $user->password)) {
//            throw ValidationException::withMessages([
//                'email' => ['The provided credentials are incorrect.'],
//            ]);
//        }
//
//        return $user->createToken($request->device_name)->plainTextToken;



//        $credentials = $request->only('email', 'password');
//
//        if (Auth::attempt($credentials)) {
//            $request->session()->regenerate();
//
//            return redirect()->intended('dashboard');
//        }
//
//        return back()->withErrors([
//            'email' => 'The provided credentials do not match our records.',
//        ]);
    }

    public function test() {
        dd('test');
    }
}
