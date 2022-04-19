<?php

namespace App\Events;

use RTippin\Messenger\Broadcasting\MessengerBroadcast;

class UserAvatarDownloaded extends MessengerBroadcast
{
    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs(): string
    {
        return 'avatar.downloaded';
    }
}
