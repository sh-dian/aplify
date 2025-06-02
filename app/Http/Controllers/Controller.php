<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function return_paginated_api($isSuccess, $statusCode, $message, $data, $error, $apiPaginator)
    {
        return response()->json([
            'is_success' => $isSuccess,
            'status_code' => $statusCode,
            'message' => $message,
            'data' => $data,
            'errors' => $error,
            'paginator' => $apiPaginator

        ], $statusCode);
    }

    public function return_api($isSuccess, $statusCode, $message, $data, $error, ?array $meta = [])
    {
        return response()->json([
            'is_success' => $isSuccess,
            'status_code' => $statusCode,
            'message' => $message,
            'data' => $data,
            'meta' => $meta,
            'errors' => $error,

        ], $statusCode);
    }}
