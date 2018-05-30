<?php

namespace App\Policies;

use App\User;
use App\Message;
use Illuminate\Auth\Access\HandlesAuthorization;

class MessagePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function before($user, $ability)
    {
        if ($user->isModerator())
            return true;
    }

    /**
     * Determine if the given user can create posts.
     *
     * @param  \App\User  $user
     * @return bool
     */
    /*public function create(User $user)
    {
        return ($user->id != null);
    }*/

    /**
     * Generic Checker, checks if the given user is the message owner
     * 
     * @param  \App\User  $user
     * @param  \App\Message  $message
     * @return bool
     */
    private function genericCheck(User &$user, Message &$message) {
        return $user->id === $message->get_author()->id;
    }

    /**
     * Determines if a given user can edit the given message
     * 
     * @param  \App\User  $user
     * @param  \App\Message  $message
     * @return bool
     */
    public function edit(User $user, Message $message)
    {
        return $this->genericCheck($user, $message);
    }

    /**
     * Determines if a given user can delete the given message
     * 
     * @param  \App\User  $user
     * @param  \App\Message  $message
     * @return bool
     */
    public function delete(User $user, Message $message)
    {
        return $this->genericCheck($user, $message);
    }

    /**
     * Determines if a given user can mark as correct the given message
     * 
     * @param  \App\User  $user
     * @param  \App\Message  $message
     * @return bool
     */
    public function markCorrect(User $user, Message $message)
    {
        return $this->genericCheck($user, $message);
    }
}
