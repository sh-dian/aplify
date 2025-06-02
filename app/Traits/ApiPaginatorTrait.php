<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait ApiPaginatorTrait
{
    function apiPaginator($data)
    {
        $paginateData = [];
        $paginateData['total'] = $data->total();
        $paginateData['count'] = $data->count();
        $paginateData['lastPage'] = $data->lastPage();
        $paginateData['perPage'] = $data->perPage();

        return $paginateData;
    }
}
