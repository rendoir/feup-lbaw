<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BadgeAttainment extends Model
{
    public function get_badge() {
        return Badge::find($this->badge_id);
    }

    public function get_user() {
        return User::find($this->user_id);
    }
}
