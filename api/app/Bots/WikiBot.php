<?php
	
	namespace App\Bots;
	
	use Illuminate\Http\Client\Response;
	use Illuminate\Support\Arr;
	use Illuminate\Support\Facades\Http;
	use RTippin\Messenger\MessengerBots;
	use RTippin\Messenger\Support\BotActionHandler;
	use Throwable;
	
	class WikiBot extends BotActionHandler
	{
		/**
		 * Endpoint we gather data from.
		 */
//		const API_ENDPOINT = 'https://en.wikipedia.org/w/api.php';
		
		/**
		 * The bots settings.
		 *
		 * @return array
		 */
		public static function getSettings() : array
		{
			return [
				'alias' => 'wiki',
				'description' => 'Get the top results for a wikipedia article search. [ !wiki {search} ]',
				'name' => 'Wikipedia Search',
				'unique' => true,
				'triggers' => ['!wiki'],
				'match' => MessengerBots::MATCH_STARTS_WITH_CASELESS,
			];
		}
		
		/**
		 * @return array
		 */
		public function rules() : array
		{
			return [
//				'limit' => ['nullable', 'integer', 'min:1', 'max:10'],
				'lang' => ['required'],
			
			];
		}
		
		/**
		 * @throws Throwable
		 */
		public function handle() : void
		{
			$search = $this->getParsedMessage();
			
			if( ! is_null($search)) {
				$wiki = $this->getWikiSearch($search);
				
				if($wiki->successful()
					&& $results = $this->formatResults($wiki->json())) {
					$this->sendWikiResultMessages($search, $results);
					
					return;
				}
			}
			
			$this->sendInvalidSearchMessage();
			
			$this->releaseCooldown();
		}
		
		/**
		 * @param string $search
		 * @param array $results
		 *
		 * @throws Throwable
		 */
		private function sendWikiResultMessages(string $search, array $results) : void
		{
			$this->composer()->emitTyping()->message("I found the following article for ( $search ) :");

//			foreach($results as $result) {
			
			$this->composer()->message($results[ 'extract' ],
				extra: [
					'type' => 'wiki',
					'image' => $results[ 'image' ],
					'dimensions' => [
						'width' => $results[ 'width' ],
						'height' => $results[ 'height' ],
					]
				]);
//			}
		}
		
		/**
		 * @throws Throwable
		 */
		private function sendInvalidSearchMessage() : void
		{
			$this->composer()->emitTyping()->message('Please select a valid search term, i.e. ( !wiki Computers )');
		}
		
		/**
		 * @param string $search
		 * @return Response
		 */
		private function getWikiSearch(string $search) : Response
		{
			return Http::acceptJson()->timeout(5)->get("https://{$this->getPayload('lang')}.wikipedia.org/w/api.php", [
				'format' => 'json',
				'action' => 'query',
				'prop' => 'extracts|pageimages',
				'exintro' => '',
				'explaintext' => '',
				'redirects' => '1',
				'titles' => $search,
				'piprop' => 'original'
			]);
		}
		
		/**
		 * Format wiki results. Index 1 contains titles, index 3 contains the links.
		 *
		 * @param array $results
		 * @return array|bool
		 */
		private function formatResults(array $results) : array|bool
		{
			$pages = Arr::get($results, 'query.pages', null);
			$page = head($pages);
			
			$extract = Arr::get($page, 'extract', null);
			$image = Arr::get($page, 'original.source', null);
			$width = Arr::get($page, 'original.width', null);
			$height = Arr::get($page, 'original.height', null);
			if(array_key_exists(-1, $pages)) return false;
			
			return [
				'extract' => $extract,
				'image' => $image,
				'width' => $width,
				'height' => $height
			
			];
		}
	}
