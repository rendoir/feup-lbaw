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

    /**
     * @var User the recipient of this notification (who was following this event).
     */
    public $following;

    /**
     * @var Answer the answer which triggered this notification.
     */
    public $answer;

    /**
     * @var bool Whether this notification's follower is the message's author
     *  or another type of follower (e.g. someone who bookmarked the message).
     */
    public $isAuthor;

    public function __construct(User $following, Answer $answer, $isAuthor = true)
    {
        $this->following = $following;
        $this->answer = $answer;
        $this->isAuthor = $isAuthor;
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
            'answer_id' => $this->answer->id,
            'question_id' => $this->answer->question->id,
            'question_title' => $this->answer->question->title,
            'is_author' => $this->isAuthor,
        ];
    }
}