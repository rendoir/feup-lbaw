<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MessageVersion extends Model
{
    protected $fillable = ['content', 'message_id'];

    public $timestamps = false;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->creation_time = $model->freshTimestamp();
        });
    }
}
