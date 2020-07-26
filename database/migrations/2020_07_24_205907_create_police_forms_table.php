<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePoliceFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('police_forms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('refNo');
            $table->string('date');
            $table->string('compName');
            $table->integer('compAge');
            $table->string('compEmail');
            $table->string('compGender');
            $table->string('compTel');
            $table->string('compDist');
            $table->string('compPlotNo');
            $table->string('compsubCounty');
            $table->string('compVillage');
            $table->string('dI')->default(0);
            $table->string('dIDescription');
            $table->string('location');
            $table->string('medExam')->default(0);
            $table->string('period');
            $table->string('reported')->default(0);
            $table->string('reportRef');
            $table->string('statement');
            $table->string('witness')->default(0);
            $table->string('victimName');
            $table->string('victimAge');
            $table->string('victimGender');
            $table->string('officerName');
            $table->string('officerRank');
            $table->string('otherId');
            $table->string('detUnit');
            $table->boolean('done')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('police_forms');
    }
}
