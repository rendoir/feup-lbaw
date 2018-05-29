<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

use App\Comment;
use App\User;

class NewComment extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var User the recipient of this notification (who was following this event).
     */
    public $following;

    /**
     * @var Answer the answer which triggered this notification.
     */
    public $comment;

    /**
     * @var bool Whether this notification's follower is the message's author
     *  or another type of follower (e.g. someone who bookmarked the message).
     */
    public $isAuthor;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $following, Comment $comment, $isAuthor = true)
    {
        $this->following = $following;
        $this->comment = $comment;
        $this->isAuthor = $isAuthor;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the broadcast representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return BroadcastMessage the message to broadcast
     */
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'id' => $this->id,
            'read_at' => null,
            'data' => $this->toArray($notifiable),
        ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'following_id' => $this->following->id,
            'following_name' => $this->following->username,
            'comment_id' => $this->comment->id,
            'commentable_id' => $this->comment->commentable->id,
            'is_author' => $this->isAuthor,
            'question_id' => $this->getQuestionId(),
        ];
    }

    private function getQuestionId() {
        $q = $this->comment->commentable->get_question();
        if ($q == NULL) {
            $q = $this->comment->commentable->get_answer()->question;
        }

        return $q->id;
    }
}
