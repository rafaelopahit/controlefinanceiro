<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
return new class extends Migration
{
    /** 
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('users')->insert([
            'email' => 'admin@gmail.com',
            'password' => "03Z5lSwT/0VCE" ,
            'name' => 'Admin',
            'email_verified_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
