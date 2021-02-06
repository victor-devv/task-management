<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create user
     *
     * ...
     */
    public function signup(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'remember_me' => 'boolean'
        ]);

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);



        return response()->json([
            'success' => true,
            'id' => $user->id,
            'name' => $user->first_name,
            'email' => $user->email,
        ], 201);
    }

    /**
     * Login user and create token
     *
     * ...
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Sin autorización'
            ], 401);
        }
        $user = Auth::user();

        if ($user) {
            return response()->json([
                'success' => true,
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);
        }
    }
}
