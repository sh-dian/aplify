<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Traits\ApiPaginatorTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiPaginatorTrait;

    /**
     * Handle user login and issue access token
     *
     * @param Request $request
     */
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);

            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
                return $this->return_api(
                    false,
                    Response::HTTP_UNAUTHORIZED,
                    'Invalid credentials',
                    null,
                    ['credentials' => ['The provided credentials are incorrect.']]
                );
            }

            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            $data = [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ];

            return $this->return_api(true, Response::HTTP_OK, null, $data, null);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred',
                'errors' => [
                    'server' => [$e->getMessage()]
                ]
            ], 500);
        }
    }

    /**
     * Handle user logout
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Revoke current user token
        Auth::user()->currentAccessToken()->delete();
        return $this->return_api(true, Response::HTTP_OK, 'Successfully Logout', null, null);
    }

}
