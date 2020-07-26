<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PoliceForm extends Model
{
    protected $fillable = [
        'refNo', 'date', 'compName', 'compAge', 'compEmail', 'compGender', 'compTel', 'compDist', 'compPlotNo', 'compsubCounty', 'compVillage',
        'dI', 'dIDescription', 'location', 'medExam', 'period', 'reportRef', 'reported', 'statement', 'witness', 
        'victimName',
        'victimAge',
        'victimGender',
        'officerName', 'officerRank', 'otherId', 'detUnit',
        'done'
    ];
}
