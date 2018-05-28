<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

use App\Answer;
use App\User;

class NewAnswer extends Notification implements ShouldQueue
{
    use Queueable;

    public $following;
    public $answer;

    public function __construct(User $following, Answer $answer)
    {
        $this->following = $following;
        $this->answer = $answer;
    }

    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'id' => $this->id,
            'read_at' => null,
            'data' => [
                'following_id' => $this->following->id,
                'following_name' => $this->following->name,
                'answer_id' => $this->answer->id,
            ],
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'id' => $this->id,
            'read_at' => null,
            'data' => [
                'following_id' => $this->following->id,
                'following_name' => $this->following->username,
                'answer_id' => $this->answer->id,
            ],
        ]);
    }
}