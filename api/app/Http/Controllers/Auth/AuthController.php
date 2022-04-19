<?php
	
	namespace App\Http\Controllers\Auth;
	
	use App\Exceptions\EmailTakenException;
	use App\Http\Controllers\Controller;
	use App\Jobs\DownloadUserAvatar;
	use App\Models\AuthProvider;
	use App\Models\User;
	use Illuminate\Support\Facades\Auth;
	use Illuminate\Support\Str;
	use Illuminate\View\View;
	use Laravel\Socialite\Contracts\User as SocialiteUser;
	use Laravel\Socialite\Facades\Socialite;
	
	class AuthController extends Controller
	{
		
		protected bool $new_user = false;

//		/**
//		 * Create a new controller instance.
//		 *
//		 * @return void
//		 */
		public function __construct()
		{
			config([
				'services.github.redirect' => route('oauth.callback', 'github'),
				'services.google.redirect' => route('oauth.callback', 'google'),
				'services.facebook.redirect' => route('oauth.callback', 'facebook'),
			]);
		}
		
		/**
		 * Redirect the user to the provider authentication page.
		 *
		 * @param string $provider
		 * @return string
		 */
		public function redirect(string $provider) : string
		{
			
			return Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
		}
		
		/**
		 * Obtain the user information from the provider.
		 *
		 * @param $provider
		 * @return View
		 * @throws EmailTakenException
		 */
		public function handleCallback($provider) : View
		{
			
			if($provider == 'facebook') {
				$user = Socialite::driver($provider)->fields([
					'name',
					'first_name',
					'last_name',
					'email',
				
				])->stateless()->user();
			} else {
				$user = Socialite::driver($provider)->stateless()->user();
			}
			$user = $this->findOrCreateUser($provider, $user);
			
			Auth::login($user);
			
			$token = $user->createToken('token')->plainTextToken;
			
			return view('oauth/callback', [
				'token' => $token,
			]);
			
			
		}
		
		
		/**
		 * @param string $provider
		 * @param $user
		 * @return User
		 * @throws EmailTakenException
		 */
		protected function findOrCreateUser(string $provider, $user) : User
		{
			$AuthProvider = AuthProvider::where('provider', $provider)
				->where('provider_user_id', $user->getId())
				->first();
			
			if($AuthProvider) {
				
				$AuthProvider->update([
					'access_token' => $user->token,
					'refresh_token' => $user->refreshToken,
				]);
				$this->newUser = true;
				
				return $AuthProvider->user;
			}
			
			if(User::where('email', $user->getEmail())->exists()) {
				throw new EmailTakenException;
			}
			
			return $this->createUser($provider, $user);
		}
		
		/**
		 * @param string $provider
		 * @param SocialiteUser $sUser
		 * @return User
		 */
		protected function createUser(string $provider, SocialiteUser $sUser) : User
		{
			
			
			$this->new_user = true;
			$user = User::create([
				'name' => $sUser->getName() ? $sUser->getName() : $sUser->getNickname(),
				
				'email' => $sUser->getEmail(),
				'email_verified_at' => now(),
			]);
			$this->uploadAvatar($provider, $user, $sUser);
			
			$user->authProviders()->create([
				'provider' => $provider,
				'provider_user_id' => $sUser->getId(),
				'access_token' => $sUser->token,
				'refresh_token' => $sUser->refreshToken,
			]);
			
			return $user;
		}
		
		
		protected function uploadAvatar($provider, $user, $sUser)
		{
			$avatar = $provider == 'facebook' ?
				Str::replace('normal', 'large', $sUser->getAvatar()) :
				$sUser->getAvatar();
			if($provider == 'facebook') {
				$avatar .= "&access_token={$sUser->token}";
				
			}
//			Log::alert($avatar . "&access_token={$sUser->token}");
			
			DownloadUserAvatar::dispatch($user, $avatar)->onQueue('messenger')->delay(8);
			
			
		}
	}
