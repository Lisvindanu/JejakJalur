<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bookmark extends Model
{
    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['user_id', 'destinasi_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function destinasi(): BelongsTo
    {
        return $this->belongsTo(Destinasi::class);
    }
}
