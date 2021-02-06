<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('projects', [ProjectController::class, 'index']);
Route::post('projects', [ProjectController::class, 'store']);
Route::get('projects/{id}', [ProjectController::class, 'show']);
Route::put('projects/{project}', [ProjectController::class, 'markAsCompleted']);
Route::delete('projects/{project}', [ProjectController::class, 'delete']);

Route::post('tasks', [TaskController::class, 'store']);
Route::put('tasks/{task}', [TaskController::class, 'markAsCompleted']);
Route::delete('tasks/{task}', [TaskController::class, 'delete']);

Route::post('auth/signup', [AuthController::class, 'signup']);
Route::post('auth/login', [AuthController::class, 'login']);
