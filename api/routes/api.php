<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ValuesController;
use App\Http\Middleware\CheckUserLogged;
use App\Http\Middleware\Cors;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::middleware([CheckUserLogged::class])->group(function () {

    Route::match(['post'], '/access/login', [
        AuthenticationController::class,
        'login',
    ]);

    Route::match(['post'], '/values/insertdata', [
        ValuesController::class,
        'insertData',
    ]);

    Route::match(['get'], '/values/list', [
        ValuesController::class,
        'list',
    ]);

    Route::match(['get'], '/values/getbyid/{id}', [
        ValuesController::class,
        'getById',
    ]);

    Route::match(['get'], '/values/delete/{id}', [
        ValuesController::class,
        'deleteData',
    ]);

    Route::match(['get'], '/report/getreport', [
        ReportController::class,
        'getReport',
    ]);

    Route::match(['post'], '/report/generatedata', [
        ReportController::class,
        'generateData',
    ]);


});


