<?php
use App\Http\Controllers\ContractController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\UserController;

Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);
Route::get('/users/{user}/contracts', [ContractController::class, 'index']); 
Route::get('/users/{user}/active-contract', [UserController::class, 'getActiveContract']);

Route::get('/plans', [PlanController::class, 'index']);
Route::post('/plans', [PlanController::class, 'store']);
Route::get('/plans/{plan}', [PlanController::class, 'show']);
Route::put('/plans/{plan}', [PlanController::class, 'update']);
Route::delete('/plans/{plan}', [PlanController::class, 'destroy']);


Route::post('/contracts', [ContractController::class, 'store']); 
Route::put('/contracts/{contract}', [ContractController::class, 'update']);

Route::get('/payments', [PaymentController::class, 'index']);
Route::get('/payments/{payment}', [PaymentController::class, 'show']);
Route::put('/payments/{payment}', [PaymentController::class, 'update']);
