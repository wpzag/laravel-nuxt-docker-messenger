<?php
	
	namespace App\Models;
	
	use Illuminate\Database\Eloquent\Model;
	use Illuminate\Database\Eloquent\Relations\BelongsTo;
	
	class AuthProvider extends Model
	{
		/**
		 * The attributes that aren't mass assignable.
		 *
		 * @var array
		 */
		protected $guarded = ['id'];
		
		/**
		 * The attributes that should be hidden for arrays.
		 *
		 * @var array
		 */
		protected $hidden = [
			'access_token', 'refresh_token',
		];
		
		/**
		 * @return BelongsTo
		 */
		public function user() : BelongsTo
		{
			return $this->belongsTo(User::class);
		}
	}
