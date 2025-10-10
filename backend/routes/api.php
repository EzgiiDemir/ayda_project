<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComponentController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\ConfigController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Sanctum auth route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ===================================
// PUBLIC ROUTES (Frontend API)
// ===================================
Route::prefix('public')->group(function () {
    // Pages
    Route::get('/pages/{slug}', [PublicController::class, 'getPage']);
    Route::get('/components/{name}', [PublicController::class, 'getComponent']);

    // Site Configs (NEW)
    Route::prefix('config')->group(function () {
        Route::get('/hero', [ConfigController::class, 'getHero']);
        Route::get('/welcome', [ConfigController::class, 'getWelcome']);
        Route::get('/treatments', [ConfigController::class, 'getTreatments']);
        Route::get('/navbar', [ConfigController::class, 'getNavbar']);
        Route::get('/footer', [ConfigController::class, 'getFooter']);
        Route::get('/contact', [ConfigController::class, 'getContact']);
        Route::get('/faq', [ConfigController::class, 'getFaq']);
    });
});

// ===================================
// AUTHENTICATION ROUTES
// ===================================
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

// ===================================
// PROTECTED ADMIN ROUTES
// ===================================
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
        Route::get('/{component}', [ComponentController::class, 'show']); // 🔥 Tekil component detay
        Route::post('/', [ComponentController::class, 'store']);
        Route::put('/{component}', [ComponentController::class, 'update']);
        Route::delete('/{component}', [ComponentController::class, 'destroy']);

        // Component Content
        Route::put('/{component}/content', [ComponentController::class, 'updateContent']);

        // Component Actions
        Route::post('/{component}/duplicate', [ComponentController::class, 'duplicate']); // 🔥 Duplicate endpoint
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

    // Site Config Management (NEW)
    Route::prefix('config')->group(function () {
        Route::get('/all', [ConfigController::class, 'getAllConfigs']);
        Route::put('/hero', [ConfigController::class, 'updateHero']);
        Route::put('/welcome', [ConfigController::class, 'updateWelcome']);
        Route::put('/treatments', [ConfigController::class, 'updateTreatments']);
        Route::put('/navbar', [ConfigController::class, 'updateNavbar']);
        Route::put('/footer', [ConfigController::class, 'updateFooter']);
        Route::put('/contact', [ConfigController::class, 'updateContact']);
        Route::put('/faq', [ConfigController::class, 'updateFaq']);
    });
});
Route::middleware('auth:api')->prefix('admin')->group(function () {
    Route::prefix('media')->group(function () {
        Route::post('/upload', [MediaController::class, 'upload']);
        Route::post('/upload-multiple', [MediaController::class, 'uploadMultiple']);
        Route::delete('/delete', [MediaController::class, 'delete']);
    });
});
