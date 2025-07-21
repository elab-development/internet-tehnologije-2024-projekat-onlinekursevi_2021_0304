<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KursController;
use App\Http\Controllers\CasController;
use App\Http\Controllers\MaterijalController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');



Route::middleware('auth:sanctum')->group(function () {

    Route::delete('/kursevi/{id}', [KursController::class, 'destroy']);
    
    Route::post('/kursevi',[KursController::class,'store']);
       Route::get('/kursevi', [KursController::class, 'getKursevi']);
    Route::get('kursevi/{id}', [KursController::class, 'show']);

      Route::apiResource('casovi', CasController::class)->only([
            'store', 'show', 'destroy'
        ]);

    Route::delete('/materijali/{id}', [MaterijalController::class, 'delete']);
    Route::get('/materijali/video/{id}', [MaterijalController::class, 'getVideo'])->name('materijal.video');
    Route::post('materijali',[MaterijalController::class,'store']);


    
    Route::delete('users/{id}', [UserController::class, 'destroy']);
    Route::get('/users/omiljeni-kursevi', [UserController::class, 'getOmiljeniKursevi']);
});
