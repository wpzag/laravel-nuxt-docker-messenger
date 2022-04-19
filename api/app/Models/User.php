<?php
	
	namespace App\Models;
	
	use Illuminate\Database\Eloquent\Factories\HasFactory;
	use Illuminate\Database\Eloquent\Relations\HasMany;
	use Illuminate\Foundation\Auth\User as Authenticatable;
	use Illuminate\Notifications\Notifiable;
	use Laravel\Sanctum\HasApiTokens;
	use RTippin\Messenger\Contracts\MessengerProvider;
	use RTippin\Messenger\Traits\Messageable;
	
	
	class User extends Authenticatable implements MessengerProvider
	{
		use HasApiTokens, HasFactory, Notifiable, Messageable;
		
		/**
		 * The attributes that are mass assignable.
		 *
		 * @var array<int, string>
		 */
		protected $fillable = [
			'name',
			'email',
			'password',
		];
		
		/**
		 * The attributes that should be hidden for serialization.
		 *
		 * @var array<int, string>
		 */
		protected $hidden = [
			'password',
			'remember_token',
			'two_factor_secret',
			'two_factor_recovery_codes'
		];
		
		/**
		 * The attributes that should be cast.
		 *
		 * @var array<string, string>
		 */
		protected $casts = [
			'email_verified_at' => 'datetime',
		];
		
		public static function getProviderSettings() : array
		{
			return [
				'alias' => 'user',
				'searchable' => true,
				'friendable' => true,
				'devices' => true,
				'default_avatar' => public_path('vendor/messenger/images/users.png'),
				'cant_message_first' => [],
				'cant_search' => [],
				'cant_friend' => [],
			];
		}
		/**
		 * Get the oauth providers.
		 *
		 * @return HasMany
		 */
		public function authProviders() : HasMany
		{
			return $this->hasMany(AuthProvider::class);
		}
		
	}
