<?php
	
	namespace Database\Factories;
	
	use App\Models\User;
	use Illuminate\Database\Eloquent\Factories\Factory;
	use Illuminate\Support\Str;
	use RTippin\Messenger\Models\Messenger;
	
	
	class UserFactory extends Factory
	{
		/**
		 * Define the model's default state.
		 *
		 * @return array
		 */
		public function definition()
		{
			return [
				
				
				'name' => $this->faker->name(),
				'email' => $this->faker->unique()->safeEmail(),
				'email_verified_at' => now(),
				'password' => bcrypt(123),
				'picture' => null,
				'remember_token' => Str::random(10),
			];
		}
		
		public function configure() : self
		{
			return $this->afterCreating(function(User $user) {
				Messenger::factory()->owner($user)->create();
			});
		}
	}
