<?php
	
	namespace App\Http\Controllers\Messenger;
	
	use Illuminate\Http\Request;
	use Illuminate\Http\UploadedFile;
	use Illuminate\Support\Facades\Artisan;
	use RTippin\Messenger\Exceptions\MessengerComposerException;
	use RTippin\Messenger\Facades\MessengerComposer;
	use RTippin\Messenger\Models\Participant;
	use RTippin\Messenger\Models\Thread;
	
	class MessengerFakerController
	
	{
		public function faker(Request $request)
		{
			
			
			$args = [
				'--count' => $request->count,
				'--delay' => 1
			];
			if($request->scope == 1) $args[ 'thread' ] = $request->id;
			
			$common = $img = $system = $react = $doc = $args;
			
			$doc[ '--url' ] = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
			$react[ '--messages' ] = 2;
			
			
			if($request->type === 'random') {
				for($i = 0; $i < $request->count; $i++) {
					$x = rand(1, 5);
					if($x === 1) Artisan::call("messenger:faker:document", $doc);
					if($x === 2) $this->sendRandomImage($request->id);
					if($x === 3) Artisan::call("messenger:faker:message", $common);
					if($x === 4) Artisan::call("messenger:faker:react", $react);
					if($x === 5) Artisan::call("messenger:faker:system", $system);
				}
				
			}
			
			
			if($request->type === 'text') {
				
				
				Artisan::call("messenger:faker:message", $args);
				
			}
			if($request->type === 'image') {
				for($i = 0; $i < $request->count; $i++) {
					$this->sendRandomImage($request->id);
				}

//				Artisan::call("messenger:faker:image",$args);
			}
			if($request->type === 'document') {
				$args[ '--url' ] = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
				Artisan::call("messenger:faker:document", $args);
			}
			if($request->type === 'audio') {
				$args[ '--url' ] = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3';
				Artisan::call("messenger:faker:audio", $args);
			}
			if($request->type === 'react') {
				$args[ '--messages' ] = 5;
				Artisan::call("messenger:faker:react", $args);
			}
			if($request->type === 'system') {
				Artisan::call("messenger:faker:system", $args);
			}
			
		}
		
		/**
		 * @throws \Throwable
		 * @throws MessengerComposerException
		 */
		protected function sendRandomImage($thread_id)
		{
			$thread = Thread::whereId($thread_id)->first() ?? Thread::inRandomOrder()->first();
			$randomUser = Participant::whereThreadId($thread->id)->inRandomOrder()->first()->owner;
			$name = uniqid();
			$file = '/tmp/' . $name;
			
			
			file_put_contents($file, file_get_contents("https://source.unsplash.com/random"));
			[$width, $height] = getimagesize($file);
			MessengerComposer::to($thread)
				->from($randomUser)
				->image(new UploadedFile($file, $name), extra: ["dimensions" => ['width' => $width, 'height' => $height]]);
			
			
			unlink($file);
			sleep(3);
		}
		
	}
