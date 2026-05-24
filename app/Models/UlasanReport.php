<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UlasanReport extends Model
{
    protected $fillable = ['user_id', 'ulasan_id', 'alasan'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function ulasan(): BelongsTo
    {
        return $this->belongsTo(Ulasan::class);
    }
}
