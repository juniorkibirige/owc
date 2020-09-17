<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use App\PoliceForm;
use Illuminate\Http\Request;

class FormsController extends Controller
{
    const rank = [
        'IGP',
        'DIGP',
        'AIGP',
        'SCP',
        'CP',
        'ACP',
        'SSP',
        'SP',
        'ASP',
        'IP',
        'AIP',
        'SGT',
        'CPL',
        'PC',
        'SPC'
    ];

    public function index()
    {
        $forms = PoliceForm::orderBy('created_at', 'desc')
            ->get();
        $month = explode('-', date('d-m-Y'))[1];
        $day = explode('-', date('d-m-Y'))[0];
        $week = [];
        $dMonth = [
            01 => 31, 28, 31, 30, 31, 30,
            07 => 31, 31, 30, 31, 30, 31
        ];
        $monday = Carbon::now()->startOfWeek();
        for ($it = 1, $cday = $monday; $it < 8; $it++) {
            $week[$it] = explode('-', explode('T', json_encode($cday))[0])[2];
            $cday = $cday->copy()->addDay();
        }

        $pM = 0;
        $pD = 0;
        $pW = 0;
        $result = [];
        $prev = '';
        $sort = [];
        $gender = [];
        $age = [];
        $m = 0;
        $f = 0;
        $all = 0;
        $ag = 0;
        for ($it = 0; $it <= $dMonth[intval($month)]; $it++) {
            if ($it == 0) {
                $sort['Central'][$it] = 0;
                $sort['Eastern'][$it] = 0;
                $sort['Western'][$it] = 0;
                $sort['Northern'][$it] = 0;
            } else {
                $sort['Central'][$it] = null;
                $sort['Eastern'][$it] = null;
                $sort['Western'][$it] = null;
                $sort['Northern'][$it] = null;
            }
        }
        $uuid = 0;
        $offenceTypeCount = [];
        $offenceRankCount = [];
        foreach (FormsController::rank as $rank) {
            $offenceRankCount[$rank] = 0;
        }
        foreach ($forms as $formData) { // Getting perMonthPerDay for Graph by
            $ret['id'] = $formData->id;
            $ret['refNo'] = $formData->refNo;
            $ret['victimName'] = $formData->victimName;
            $ret['cDist'] = $formData->cDist;
            $ret['victimAge'] = $formData->victimAge;
            $ret['victimGender'] = $formData->victimGender;
            $ret['officerName'] = $formData->officerName;
            $ret['officerRank'] = $formData->officerRank;
            $ret['done'] = $formData->done;
            $ret['open'] = $formData->open;
            $ret['underInv'] = $formData->underInv;
            array_push($result, (object)$ret);
            $uuid = $uuid + 1;
            foreach (self::rank as $rank) {
                if ($rank === $formData->officerRank) {
                    try {
                        $age[$rank] = $age[$rank] + 1;
                    } catch (\Throwable $th) {
                        $age[$rank] = 1;
                    }
                }
            }
            try {
                $offenceTypeCount[$formData->offenseType]++;
            } catch (\Throwable $th) {
                $offenceTypeCount[$formData->offenseType] = 1;
            }
            $offenceRankCount[$formData->officerRank]++;
            $date = explode(' ', $formData->created_at)[0];
            $cm = explode('-', $date)[1];
            $cd = explode('-', $date)[2];
            if ($cm == $month) {
                if (($prev == '') || ($prev != $formData->cRegion)) {
                    $prev = $formData->cRegion;
                    for ($it = 1; $it <= $dMonth[intval($month)]; $it++) {
                        if ($sort[$prev][$it] == NULL) {
                            $sort[$prev][$it] = 0;
                        }
                        if (intval($cd) == $it) {
                            $sort[$prev][$it] = $sort[$prev][$it] + 1;
                            break;
                        }
                        // if ($i < intval($cd) && $sort[$prev][$i] == null)
                        //     $sort[$prev][$i] = 0;
                    }
                } else {
                    for ($i = 1; $i <= $dMonth[intval($month)]; $i++) {
                        if ($sort[$prev][$i] == NULL) {
                            $sort[$prev][$i] = 0;
                        }
                        if (intval($cd) == $i) {
                            $sort[$prev][$i] = $sort[$prev][$i] + 1;
                            break;
                        }
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
        $rOff = [];
        foreach (self::rank as $rank) {
            array_push($rOff, [$rank, $offenceRankCount[$rank]]);
        }
        $res['forms'] = $result;
        $res['perMonth'] = $pM;
        $res['perDay'] = $pD;
        $res['perWeek'] = $pW;
        $res['byRegion'] = $sort;
        $res['byGender'] = $offenceTypeCount;
        $res['byRank'] = $rOff;

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
            'offenseType' => 'required',
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
            "offenseType" => $validatedData['offenseType'],
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
        if($validatedData['witness'] == 1) {
            $validateData = $request->validate([
                'witnessName' => 'required',
                'witnessContact' => 'required'
            ]);
            $f = PoliceForm::find($form->id);
            $f->witnessName = $validateData['witnessName'];
            $f->witnessContact = $validateData['witnessContact'];
            $f->update();
        }
        return response()->json('Project created!');
    }

    public function show($id) {
        $form = PoliceForm::where('id', '=', $id)->get();
        return json_encode($form);
    }

    public function update($id, Request $request) {
        $form = PoliceForm::find($id);
        $form->open = $request->open === "true" ? 1 : 0;
        $form->underInv = $request->underInv === "true" ? 1 : 0;
        $form->done = $request->done === "true" ? 1 : 0;
        $form->update();
        return json_encode(
            [
                "success" => true,
                "data" => "Status changed to " . $request->open === "true" ? "Open" : $request->underInv === "true" ? "Under Investigation" : "Done"
            ]
        );
    }
}
