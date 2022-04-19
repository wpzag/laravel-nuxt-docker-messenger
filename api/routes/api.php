<?php
	
	use App\Http\Controllers\Auth\AuthController;
	use App\Http\Controllers\Auth\OAuthController;
	use App\Http\Controllers\Messenger\JitsiController;
	use App\Http\Controllers\Messenger\MessengerFakerController;
	use App\Http\Controllers\Messenger\MessengerJitsiController;
	use App\Http\Controllers\Messenger\MessengerUserController;
	use Illuminate\Support\Facades\Route;
	
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
	Route::get('/messenger/demo_users', [MessengerUserController::class, 'demo'])->middleware('messenger.provider');
	
	Route::group(['middleware' => 'auth:sanctum'], function() {
	
//		Route::post('oauth/{driver}', [OAuthController::class, 'redirect']);
//		Route::get('oauth/{driver}/callback', [OAuthController::class, 'handleCallback'])->name('oauth.callback');
		
		
		Route::get('/api/user', [MessengerUserController::class, 'current'])->middleware('messenger.provider:required');
		
		Route::get('get_room_token', [MessengerJitsiController::class, 'get_room_token']);
		
		Route::get('/messenger/users', [MessengerUserController::class, 'index'])->middleware('messenger.provider:required');
		Route::get('/messenger/faker', [MessengerFakerController::class, 'faker'])->middleware('messenger.provider:required');
		
		
	});
	
	
		Route::post('oauth/{driver}', [AuthController::class, 'redirect']);
		Route::get('oauth/{driver}/callback', [AuthController::class, 'handleCallback'])->name('oauth.callback');
