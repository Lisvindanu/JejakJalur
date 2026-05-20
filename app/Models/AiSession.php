<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiSession extends Model
{
    use HasUuids;

    protected $fillable = ['user_id', 'session_token', 'message_count', 'last_message_at', 'history'];

    protected $casts = [
        'last_message_at' => 'datetime',
        'history' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
