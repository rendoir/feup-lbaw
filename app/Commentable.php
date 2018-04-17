<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commentable extends Model
{

    public function get_comments() {
        return $this->hasMany('App\Comment', 'commentable_id');
    }

    public function get_num_comments() {
        return $this->get_comments()->count();
    }

}
