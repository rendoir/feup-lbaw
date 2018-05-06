<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['id', 'commentable_id'];

    public $timestamps = false;

    public function message() {
        return $this->hasOne('App\Message', 'id');
    }
}
