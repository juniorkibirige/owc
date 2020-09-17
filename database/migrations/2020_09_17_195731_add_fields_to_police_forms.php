<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToPoliceForms extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('police_forms', function (Blueprint $table) {
            $table->string('underInv_by')->nullable(true);
            $table->string('done_by')->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('police_forms', function (Blueprint $table) {
            $table->dropColumn('underInv_by');
            $table->dropColumn('done_by');
        });
    }
}
