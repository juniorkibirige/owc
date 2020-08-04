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
        $dMonth = [
            01 => 31, 28, 31, 30, 31, 30,
            07 => 31, 31, 30, 31, 30, 31
        ];
        $monday = Carbon::now()->startOfWeek();
        for ($i = 1, $cday = $monday; $i < 8; $i++) {
            $week[$i] = explode('-', explode('T', json_encode($cday))[0])[2];
            $cday = $cday->copy()->addDay();
        }
        $pM = 0;
        $pD = 0;
        $pW = 0;
        $prev = '';
        $sort = [];
        $gender = [];
        $m = 0;
        $f = 0;
        $all = 0;
        for ($i = 0; $i <= $dMonth[intval($month)]; $i++) {
            if ($i == 0) {
                $sort['Central'][$i] = 0;
                $sort['Eastern'][$i] = 0;
                $sort['Western'][$i] = 0;
                $sort['Northern'][$i] = 0;
            } else {
                $sort['Central'][$i] = null;
                $sort['Eastern'][$i] = null;
                $sort['Western'][$i] = null;
                $sort['Northern'][$i] = null;
            }
        }
        foreach ($forms as $formData) { // Getting perMonthPerDay for Graph by 
            $date = explode(' ', $formData->created_at)[0];
            $cm = explode('-', $date)[1];
            $cd = explode('-', $date)[2];
            if ($cm == $month) {
                if (($prev == '') || ($prev != $formData->cRegion))
                    $prev = $formData->cRegion;
                else {
                    for ($i = 1; $i <= $dMonth[intval($month)]; $i++) {
                        if ($cd == $i)
                            $sort[$prev][$i] = $sort[$prev][$i] + 1;
                    }
                }
            }
            if ($formData->victimGender == 'Male' || $formData->victimGender == 'male') {
                $m++;
                $all++;
            } else if ($formData->victimGender == 'Female' || $formData->victimGender == 'female') {
                $f++;
                $all++;
            }
        }
        if ($all !== 0) {
            $gender['Male'] = ($m / $all) * 100;
            $gender['Female'] = ($f / $all) * 100;
        } else {
            $gender['Male'] = 0;
            $gender['Female'] = 0;
        }
        foreach ($forms as $form) {
            $datetime = $form->created_at;
            $date = explode(' ', $datetime)[0];
            $cm = explode('-', $date)[1];
            $cd = explode('-', $date)[2];
            if ($month == $cm) $pM += 1;
            if ($day == $cd) $pD += 1;
            foreach ($week as $key => $current_day) {
                if ($current_day == $cd) $pW += 1;
            }
        }
        $res['forms'] = $forms;
        $res['perMonth'] = $pM;
        $res['perDay'] = $pD;
        $res['perWeek'] = $pW;
        $res['byRegion'] = $sort;
        $res['byGender'] = $gender;

        return json_encode($res);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'refNo' => 'required',
            'date' => 'required',
            'compName' => 'required',
            'compAge' => 'required',
            'compEmail' => 'nullable|present',
            'compGender' => 'required',
            'compTel' => 'required',
            'compDist' => 'required',
            'compRegion' => 'required',
            'compsubCounty' => 'required',
            'compCounty' => 'required',
            'compVillage' => 'nullable|present',
            'dI' => 'nullable|present',
            'dIDescription' => 'nullable|present',
            'cDist' => 'required',
            'cRegion' => 'required',
            'csubCounty' => 'required',
            'cCounty' => 'required',
            'cVillage' => 'present',
            'medExam' => 'nullable|present',
            'medExamRef' => 'nullable|present',
            'period' => 'required',
            'reportRef' => 'nullable|present',
            'reported' => 'nullable|present',
            'statement' => 'required',
            'witness' => 'nullable|present',
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
            'compRegion' => $validatedData['compRegion'],
            'compsubCounty' => $validatedData['compsubCounty'],
            'compCounty' => $validatedData['compCounty'],
            'compVillage' => $validatedData['compVillage'],
            'dI' => $validatedData['dI'],
            'dIDescription' => $validatedData['dIDescription'],
            'cDist' => $validatedData['cDist'],
            'cRegion' => $validatedData['cRegion'],
            'csubCounty' => $validatedData['csubCounty'],
            'cCounty' => $validatedData['cCounty'],
            'cVillage' => $validatedData['cVillage'],
            'medExam' => $validatedData['medExam'],
            'medExamRef' => $validatedData['medExamRef'],
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
