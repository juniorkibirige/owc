<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PoliceForm extends Model
{
    protected $fillable = [
        'refNo', 
        'date', 
        'compName', 
        'compAge', 
        'compEmail', 
        'compGender', 
        'compTel',
        'compDist',
        'compRegion',
        'compsubCounty',
        'compCounty',
        'compVillage',
        'dI', 'dIDescription',
        'cDist',
        'cRegion',
        'csubCounty',
        'cCounty',
        'cVillage', 
        'medExam',
        'medExamRef', 'period', 'reportRef', 'reported', 'statement', 'witness', 
        'victimName',
        'victimAge',
        'victimGender',
        'officerName', 'officerRank', 'otherId', 'detUnit'
    ];
}
