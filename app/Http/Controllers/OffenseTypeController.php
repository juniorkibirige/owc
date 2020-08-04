<?php

namespace App\Http\Controllers;
use App\OffenseType;

use Illuminate\Http\Request;

class OffenseTypeController extends Controller
{
    public function store(Request $request) {
        $vData = $request->validate([
            'name' => 'required'
        ]);

        $of = OffenseType::create([
            'name' => $vData['name']
        ]);
        return response()->json(['data' => $of, 'ret'=>"New Offence Added"]);
    }

    public function index()
    {
        $oT = OffenseType::get();

        return json_encode($oT);
    }
}
