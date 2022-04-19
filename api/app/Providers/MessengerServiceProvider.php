<?php
	
	namespace App\Providers;
	
	use App\Bots\NeoPackage;
	use App\Bots\RandomImageBot;
	use App\Bots\TenorGifBot;
	use App\Bots\WikiBot;
	use App\Bots\YoutubeBot;
	use App\Models\User;
	use App\Services\JitsiVideoBroker;
	use Illuminate\Support\ServiceProvider;
	use RTippin\Messenger\Facades\Messenger;
	use RTippin\Messenger\Facades\MessengerBots;
	use RTippin\MessengerBots\Bots\ChuckNorrisBot;
	use RTippin\MessengerBots\Bots\CoinTossBot;
	use RTippin\MessengerBots\Bots\CommandsBot;
	use RTippin\MessengerBots\Bots\DadJokeBot;
	use RTippin\MessengerBots\Bots\DocumentFinderBot;
	use RTippin\MessengerBots\Bots\InsultBot;
	use RTippin\MessengerBots\Bots\InviteBot;
	use RTippin\MessengerBots\Bots\JokeBot;
	use RTippin\MessengerBots\Bots\KanyeBot;
	use RTippin\MessengerBots\Bots\KnockBot;
	use RTippin\MessengerBots\Bots\LocationBot;
	use RTippin\MessengerBots\Bots\NukeBot;
	use RTippin\MessengerBots\Bots\QuotableBot;
	use RTippin\MessengerBots\Bots\ReactionBot;
	use RTippin\MessengerBots\Bots\ReplyBot;
	use RTippin\MessengerBots\Bots\RockPaperScissorsBot;
	use RTippin\MessengerBots\Bots\RollBot;
	use RTippin\MessengerBots\Bots\WeatherBot;
	use RTippin\MessengerBots\Bots\YoMommaBot;
	use RTippin\MessengerBots\Packages\GamesPackage;
	use RTippin\MessengerBots\Packages\JokesterPackage;
	use RTippin\MessengerFaker\Commands\AudioCommand;
	use RTippin\MessengerFaker\Commands\DocumentCommand;
	use RTippin\MessengerFaker\Commands\ImageCommand;
	use RTippin\MessengerFaker\Commands\KnockCommand;
	use RTippin\MessengerFaker\Commands\MessageCommand;
	use RTippin\MessengerFaker\Commands\ReactCommand;
	use RTippin\MessengerFaker\Commands\ReadCommand;
	use RTippin\MessengerFaker\Commands\SystemCommand;
	use RTippin\MessengerFaker\Commands\TypingCommand;
	use RTippin\MessengerFaker\Commands\UnReadCommand;
	
	
	/**
	 * Laravel Messenger System, Created by: Richard Tippin.
	 * @link https://github.com/RTippin/messenger
	 * @link https://github.com/RTippin/messenger-bots
	 * @link https://github.com/RTippin/messenger-faker
	 * @link https://github.com/RTippin/messenger-ui
	 */
	class MessengerServiceProvider extends ServiceProvider
	{
		/**
		 * Bootstrap services.
		 *
		 * @return void
		 */
		public function boot()
		{
			// Register all provider models you wish to use in messenger.
			Messenger::registerProviders([
				User::class,
			]);
			
			// Set the video call driver of your choosing.
			// Messenger::setVideoDriver(MyVideoBroker::class);
			// Enable calling and set the video driver of your choosing. Janus is included.
			Messenger::setCalling(true);
			
			Messenger::setVideoDriver(JitsiVideoBroker::class);
			
			Messenger::setCallSubscriber('queued', false);
			
			// Register bot handlers you wish to use. You can install the messenger-bots addon for ready-made handlers.
			MessengerBots::registerHandlers([
				ChuckNorrisBot::class,
				CoinTossBot::class,
				CommandsBot::class,
				DadJokeBot::class,
				DocumentFinderBot::class,
				TenorGifBot::class,
				InsultBot::class,
				InviteBot::class,
				JokeBot::class,
				KanyeBot::class,
				KnockBot::class,
				LocationBot::class,
				NukeBot::class,
				QuotableBot::class,
				RandomImageBot::class,
				ReactionBot::class,
				ReplyBot::class,
				RockPaperScissorsBot::class,
				RollBot::class,
				WeatherBot::class,
				WikiBot::class,
				YoMommaBot::class,
				YoutubeBot::class,
			
			]);
			
			// Register the packaged bots you wish to use.
			MessengerBots::registerPackagedBots([
				GamesPackage::class,
				JokesterPackage::class,
				NeoPackage::class,
			]);
			
			$this->commands([
				KnockCommand::class,
				MessageCommand::class,
				ImageCommand::class,
				DocumentCommand::class,
				ReadCommand::class,
				TypingCommand::class,
				UnReadCommand::class,
				ReactCommand::class,
				SystemCommand::class,
				AudioCommand::class
			]);
			
		}
	}
