<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use App\PoliceForm;
use Illuminate\Http\Request;

class FormsController extends Controller
{
    public function index()
    {
        $forms = PoliceForm::where('done', false)
            ->orderBy('created_at', 'desc')
            ->get();
        $month = explode('-', date('d-m-Y'))[1];
        $day = explode('-', date('d-m-Y'))[0];
        $week = [];
        $monday = Carbon::now()->startOfWeek();
        for ($i=1, $day=$monday; $i < 8; $i++) { 
            $week[$i] = explode('-', explode('T', json_encode($day))[0])[2];
            $day = $day->copy()->addDay();
        }
        $pM = 0;
        $pD = 0;
        $pW = 0;
        foreach ($forms as $form) {
            $datetime = $form->created_at;
            $date = explode(' ', $datetime)[0];
            $cm = explode('-', $date)[1];
            $cd = explode('-', $date)[2];
            if($month == $cm) $pM += 1;
            if($day == $cd) $pD += 1;
            foreach ($week as $key => $day) {
                if($day == $cd) $pW += 1;
            }
        }
        $res['forms'] = $forms;
        $res['perMonth'] = $pM;
        $res['perDay'] = $pD;
        $res['perWeek'] = $pW;

        return json_encode($res);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'refNo' => 'required',
            'date' => 'required',
            'compName' => 'required',
            'compAge' => 'required',
            'compEmail' => 'nullable',
            'compGender' => 'required',
            'compTel' => 'required',
            'compDist' => 'required',
            'compPlotNo' => 'nullable',
            'compsubCounty' => 'required',
            'compVillage' => 'required',
            'dI' => 'nullable',
            'dIDescription' => 'nullable',
            'location' => 'required',
            'medExam' => 'nullable',
            'period' => 'required',
            'reportRef' => 'nullable',
            'reported' => 'nullable',
            'statement' => 'required',
            'witness' => 'nullable',
            'victimName' => 'required',
            'victimAge' => 'required',
            'victimGender' => 'required',
            'officerName' => 'required',
            'officerRank' => 'required',
            'otherId' => 'required',
            'detUnit' => 'required'
        ]);

        $form = PoliceForm::create([
            'refNo' => $validatedData['refNo'],
            'date' => $validatedData['date'],
            'compName' => $validatedData['compName'],
            'compAge' => $validatedData['compAge'],
            'compEmail' => $validatedData['compEmail'],
            'compGender' => $validatedData['compGender'],
            'compTel' => $validatedData['compTel'],
            'compDist' => $validatedData['compDist'],
            'compPlotNo' => $validatedData['compPlotNo'],
            'compsubCounty' => $validatedData['compsubCounty'],
            'compVillage' => $validatedData['compVillage'],
            'dI' => $validatedData['dI'],
            'dIDescription' => $validatedData['dIDescription'],
            'location' => $validatedData['location'],
            'medExam' => $validatedData['medExam'],
            'period' => $validatedData['period'],
            'reportRef' => $validatedData['reportRef'],
            'reported' => $validatedData['reported'],
            'statement' => $validatedData['statement'],
            'witness' => $validatedData['witness'],
            'victimName' => $validatedData['victimName'],
            'victimAge' => $validatedData['victimAge'],
            'victimGender' => $validatedData['victimGender'],
            'officerName' => $validatedData['officerName'],
            'officerRank' => $validatedData['officerRank'],
            'otherId' => $validatedData['otherId'],
            'detUnit' => $validatedData['detUnit']
        ]);
        return response()->json('Project created!');
    }
}
