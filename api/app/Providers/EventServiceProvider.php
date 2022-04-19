<?php
	
	namespace App\Providers;
	
	use App\Listeners\SendJoinedEventToOtherParticipant;
	use Illuminate\Auth\Events\Registered;
	use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
	use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
	use RTippin\Messenger\Events\CallJoinedEvent;
	
	class EventServiceProvider extends ServiceProvider
	{
		/**
		 * The event listener mappings for the application.
		 *
		 * @var array<class-string, array<int, class-string>>
		 */
		protected $listen = [
			Registered::class => [
				SendEmailVerificationNotification::class,
			],
			
			CallJoinedEvent::class => [
				SendJoinedEventToOtherParticipant::class,
			],
		];
		
		/**
		 * Register any events for your application.
		 *
		 * @return void
		 */
		public function boot()
		{
			//
		}
	}
