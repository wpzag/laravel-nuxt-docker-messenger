<?php

namespace App\Bots;

use Illuminate\Support\Facades\Artisan;
use RTippin\Messenger\Actions\Bots\BotActionHandler;
use RTippin\Messenger\Facades\Messenger;
use Throwable;

class RandomBot extends BotActionHandler
{
    /**
     * The bots settings.
     *
     * @return array
     */
    public static function getSettings(): array
    {
        return [
            'alias' => 'mind_control',
            'description' => 'Make random participants send messages.',
            'name' => 'Mind Control',
            'unique' => true,
            'match' => 'exact',
            'triggers' => ['!mindcontrol'],
        ];
    }

    /**
     * @throws Throwable
     */
    public function handle(): void
    {
        $this->composer()->emitTyping()->message("I summon my minions to communicate gibberish! You will never understand {$this->message->owner->getProviderName()}...");

        sleep(3);

        Artisan::call('messenger:faker:message', [
            'thread' => $this->thread->id,
            '--count' => 7,
            '--delay' => 1,
        ]);

        sleep(2);

        Messenger::setProvider($this->action->bot);

        $this->composer()->emitTyping()->message('That made no sense! :thinking:');
    }
}
