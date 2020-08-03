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
            $table->unique('refNo');
            $table->string('refNo');
            $table->string('date');
            $table->string('compName');
            $table->integer('compAge');
            $table->string('compEmail');
            $table->string('compGender');
            $table->string('compTel');
            $table->string('compDist');
            $table->string('compCounty');
            $table->string('compRegion');
            $table->string('compsubCounty');
            $table->string('compVillage')->default('');
            $table->string('dI')->default(0);
            $table->string('dIDescription')->default('');
            $table->string('cDist');
            $table->string('cCounty');
            $table->string('cRegion');
            $table->string('csubCounty');
            $table->string('cVillage')->default('');
            $table->string('medExam')->default(0);
            $table->string('medExamRef')->default('');
            $table->string('period');
            $table->string('reported')->default(0);
            $table->string('reportRef')->default('');
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
            $table->boolean('underInv')->default(0);
            $table->boolean('open')->default(1);
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
