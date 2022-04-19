<?php
	
	namespace App\Jobs;
	
	use App\Events\UserAvatarDownloaded;
	use App\Events\UserAvatarDownloading;
	use App\Models\User;
	use Illuminate\Bus\Queueable;
	use Illuminate\Contracts\Queue\ShouldQueue;
	use Illuminate\Foundation\Bus\Dispatchable;
	use Illuminate\Http\Client\Response;
	use Illuminate\Http\UploadedFile;
	use Illuminate\Queue\InteractsWithQueue;
	use Illuminate\Queue\SerializesModels;
	use Illuminate\Support\Facades\Http;
	use RTippin\Messenger\Actions\Messenger\StoreMessengerAvatar;
	use RTippin\Messenger\Exceptions\FeatureDisabledException;
	use RTippin\Messenger\Facades\Messenger;
	use Throwable;
	
	class DownloadUserAvatar implements ShouldQueue
	{
		use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
		
		/**
		 * @var User
		 */
		public User $user;
		
		/**
		 * @var string
		 */
		public string $avatarEndpoint;
		
		
		/**
		 * Create a new job instance.
		 *
		 * @param User $user
		 * @param string $avatarEndpoint
		 */
		public function __construct(User $user, string $avatarEndpoint)
		{
			$this->user = $user;
			$this->avatarEndpoint = $avatarEndpoint;
			
		}
		
		/**
		 * @throws FeatureDisabledException
		 * @throws Throwable
		 */
		public function handle(StoreMessengerAvatar $storeMessengerAvatar) : void
		{
			
			
			broadcaster()->to($this->user)->broadcast(UserAvatarDownloading::class);
			
			
			Messenger::setProvider($this->user);

//			$broadcaster->to($this->user)->broadcast(UserAvatarDownloading::class);
			
			
			$name = uniqid();
			$file = '/tmp/' . $name;
			
			file_put_contents($file, file_get_contents($this->avatarEndpoint));
			
			$storeMessengerAvatar->execute(
				new UploadedFile($file, $name)
			);
			
			unlink($file);
			
			broadcaster()
				->to($this->user)
				->with([
					'avatar' => [
						'sm' => $this->user->getProviderAvatarRoute('sm'),
						'md' => $this->user->getProviderAvatarRoute('md'),
						'lg' => $this->user->getProviderAvatarRoute('lg'),
					]
				])
				->broadcast(UserAvatarDownloaded::class);
			
		}
		
		/**
		 * @return Response
		 */
		private function fetchAvatar() : Response
		{
			return Http::timeout(15)->get($this->avatarEndpoint);
		}
	}
