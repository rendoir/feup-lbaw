<?php

namespace App\Listeners;

use App\Events\MessageCommented;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendMessageNotification // implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  MessageCommented  $event
     * @return void
     */
    public function handle(MessageCommented $event)
    {
        //
    }
}
