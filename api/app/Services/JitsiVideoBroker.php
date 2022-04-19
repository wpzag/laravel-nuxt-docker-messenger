<?php

namespace App\Services;

use RTippin\Messenger\Contracts\VideoDriver;
use RTippin\Messenger\Models\Call;
use RTippin\Messenger\Models\Thread;

class JitsiVideoBroker implements VideoDriver
{


    /**
     * @inheritDoc
     */
    public function create(Thread $thread, Call $call): bool
    {



        return true;
    }

    /**
     * @inheritDoc
     */
    public function destroy(Call $call): bool
    {
        return true;
    }

    /**
     * @inheritDoc
     */
    public function getRoomId(): ?string
    {
        return rand();
    }

    /**
     * @inheritDoc
     */
    public function getRoomPin(): ?string
    {
        return rand();
    }

    /**
     * @inheritDoc
     */
    public function getRoomSecret(): ?string
    {
        return null;
    }

    /**
     * @inheritDoc
     */
    public function getExtraPayload(): ?string
    {
        return null;
    }
}
