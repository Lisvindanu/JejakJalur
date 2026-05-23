<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ulasan extends Model
{
    protected $table = 'ulasan';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'user_id', 'destinasi_id', 'judul', 'konten', 'rating',
    ];

    protected static function booted(): void
    {
        static::created(fn (Ulasan $u) => $u->destinasi->updateRating());
        static::updated(fn (Ulasan $u) => $u->destinasi->updateRating());
        static::deleted(fn (Ulasan $u) => $u->destinasi->updateRating());
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function destinasi(): BelongsTo
    {
        return $this->belongsTo(Destinasi::class);
    }

    public function likes(): HasMany
    {
        return $this->hasMany(UlasanLike::class);
    }
}
