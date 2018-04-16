<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    // Don't add create and update timestamps in database.
    public $timestamps  = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password_hash'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password_hash'
    ];

    public function getAuthPassword()
    {
        return $this->attributes['password_hash'];
    }

    public function getBadge() {
        if (TrustedBadge::find($this->id) == null)
            return null;

        if (ModeratorBadge::find($this->id) == null)
            return 'Trusted';
        else
            return 'Moderator';
    }
}
