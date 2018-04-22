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

    public function getBadgeAttainments() {
        return $this->hasMany('App\BadgeAttainment');
    }

    public function getBadge() {
        $attained_badges = $this->getBadgeAttainments()->first();

        if ($attained_badges == null)
            return null;

        if (ModeratorBadge::find($attained_badges->badge_id) == null)
            return 'Trusted';
        else
            return 'Moderator';
    }
}
