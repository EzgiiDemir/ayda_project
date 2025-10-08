<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComponentController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\PageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Public Routes (Frontend API)
Route::prefix('public')->group(function () {
    // Sayfa verilerini getir
    Route::get('/pages/{slug}', [PageController::class, 'getBySlug']);

    // Component verilerini getir (navbar, footer, vb.)
    Route::get('/components/{name}', [ComponentController::class, 'getByName']);
});

// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

// Protected Admin Routes
Route::middleware('auth:api')->prefix('admin')->group(function () {

    // Pages Management
    Route::prefix('pages')->group(function () {
        Route::get('/', [PageController::class, 'index']);
        Route::get('/{page}', [PageController::class, 'show']);
        Route::post('/', [PageController::class, 'store']);
        Route::put('/{page}', [PageController::class, 'update']);
        Route::delete('/{page}', [PageController::class, 'destroy']);

        // Page Content
        Route::put('/{page}/content', [PageController::class, 'updateContent']);

        // Page Components
        Route::post('/{page}/components', [PageController::class, 'attachComponent']);
        Route::delete('/{page}/components', [PageController::class, 'detachComponent']);
        Route::put('/{page}/components/order', [PageController::class, 'updateComponentOrder']);

        // Page Actions
        Route::post('/{page}/duplicate', [PageController::class, 'duplicate']);
    });

    // Components Management
    Route::prefix('components')->group(function () {
        Route::get('/', [ComponentController::class, 'index']);
        Route::post('/', [ComponentController::class, 'store']);
        Route::put('/{component}', [ComponentController::class, 'update']);
        Route::delete('/{component}', [ComponentController::class, 'destroy']);

        // Component Content
        Route::put('/{component}/content', [ComponentController::class, 'updateContent']);
    });

    // Media Management
    Route::prefix('media')->group(function () {
        Route::get('/', [MediaController::class, 'index']);
        Route::get('/{media}', [MediaController::class, 'show']);
        Route::post('/upload', [MediaController::class, 'upload']);
        Route::post('/upload-multiple', [MediaController::class, 'uploadMultiple']);
        Route::put('/{media}', [MediaController::class, 'update']);
        Route::delete('/{media}', [MediaController::class, 'destroy']);
        Route::post('/delete-multiple', [MediaController::class, 'destroyMultiple']);
    });
});
