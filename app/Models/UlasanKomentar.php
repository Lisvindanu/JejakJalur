<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UlasanKomentar extends Model
{
    protected $table = 'ulasan_komentar';

    protected $fillable = ['ulasan_id', 'user_id', 'konten', 'is_admin'];

    protected $casts = ['is_admin' => 'boolean'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function ulasan(): BelongsTo
    {
        return $this->belongsTo(Ulasan::class);
    }
}
