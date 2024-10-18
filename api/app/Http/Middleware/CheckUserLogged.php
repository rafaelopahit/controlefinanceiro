<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserLogged
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $token = request()->bearerToken();



        if (request()->bearerToken() != "" && request()->path() != "api/access/login" && request()->path() != "api/report/getreport") {

            $user = \App\Models\User::where('api_token', $token)->first();

            if ($user) {


            } else {
                return response()->json(['success' => false, 'error' => 'User not logged in.'], 401);
            }
        } else {
            if (request()->path() != "api/access/login" && request()->path() != "api/report/getreport")
                return response()->json(['success' => false, 'error' => 'User not logged in.'], 401);
        }
        return $next($request);

    }
}
