<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class AuthenticationController extends Controller
{

    function __construct()
    {

    }

    function login()
    {


        $request = request()->post();
        if (request()->method() == 'POST') {
            $modelUsuario = new \App\Models\User();
            $modelUsuario->email = $request['email'];
            $modelUsuario->password = $request['password'];
            $usuario = $modelUsuario->searchUserApplication();
            if ($usuario) {
                //$usuario->loginsrealizados += 1;
                //$usuario->save();
                if (crypt($request['password'], $usuario->password) == $usuario->password) {
                    $token = Str::random(255);
                    $usuario->api_token = $token;
                    $usuario->save();
                    return ['user' => $usuario, 'success' => true];
                } else {
                    return response()->json(['success' => false, 'error' => 'Usuário ou senha incorretos.']);
                }
            } else {
                return response()->json(['success' => false]);
            }
        }
    }
}
