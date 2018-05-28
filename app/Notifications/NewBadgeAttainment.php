<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

use App\User;
use App\Badge;

class NewBadgeAttainment extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var User the recipient of this notification.
     */
    public $following;

    /**
     * @var BadgeAttainment the badge relation which triggered this notification.
     */
    public $badge;

    public function __construct(User $following, Badge $badge)
    {
        $this->following = $following;
        $this->badge = $badge;
    }

    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'id' => $this->id,
            'read_at' => null,
            'data' => $this->toArray($notifiable),
        ]);
    }

    public function toArray($notifiable)
    {
        return [
            'following_id' => $this->following->id,
            'following_name' => $this->following->username,
            // TODO
        ];
    }
}