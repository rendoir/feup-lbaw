<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commentable extends Model
{

    public function get_comments() {
        return $this->belongsToMany('App\Comment', 'commentable_id');
    }
    
}
