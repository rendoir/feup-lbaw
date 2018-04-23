<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commentable extends Model
{
    protected $fillable = ['id'];

    public $timestamps = false;

    public function get_comments() {
        return $this->hasMany('App\Comment', 'commentable_id');
    }

    public function get_num_comments() {
        return $this->get_comments()->count();
    }

}
