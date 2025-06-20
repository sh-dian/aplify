<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RestrictToRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        if (Auth::user()->role !== $role) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized: You do not have the required role.',
            ], Response::HTTP_FORBIDDEN);
        }
        return $next($request);
    }
}
