<?php
	
	namespace App\Bots;
	
	use Illuminate\Http\Client\Response;
	use Illuminate\Support\Facades\Http;
	use RTippin\Messenger\MessengerBots;
	use RTippin\Messenger\Support\BotActionHandler;
	use Throwable;
	
	class TenorGifBot extends BotActionHandler
	{
		/**
		 * Endpoint we gather data from.
		 */
		const API_ENDPOINT = 'https://g.tenor.com/v1/random';
		
		/**
		 * The bots settings.
		 *
		 * @return array
		 */
		public static function getSettings() : array
		{
			return [
				'alias' => 'tenor',
				'description' => 'Get a random gif from tenor, with an optional search word. [ !gif {search word?} ]',
				'name' => 'Tenor Gifs',
				'unique' => true,
				'triggers' => ['!gif'],
				'match' => MessengerBots::MATCH_STARTS_WITH_CASELESS,
			];
		}
		
		/**
		 * @throws Throwable
		 */
		public function handle() : void
		{
			$gif = $this->getGif();
			
			if($gif->failed()) {
				$this->releaseCooldown();
				
				return;
			}
			$result = $gif->json('results')[ 0 ][ 'media' ][ 0 ][ 'gif' ];
//			dump($result);
			$width = $result[ 'dims' ][ 0 ];
			$height = $result[ 'dims' ][ 1 ];
			$this->composer()->emitTyping()->message($result[ 'url' ], extra: ["type" => "gif", "dimensions" => ['width' => $width, 'height' => $height]]);
		}
		
		/**
		 * @return Response
		 */
		private function getGif() : Response
		{
			return Http::acceptJson()->timeout(5)->get("https://g.tenor.com/v1/random", [
				'api_key' => env("TENOR_GIF_API_KEY"),
				'media_filter' => 'minimal',
				'q' => $this->getParsedMessage(),
				'limit' => '1',
			]);
			
			
		}
	}
