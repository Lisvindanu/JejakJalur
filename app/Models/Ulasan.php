<?php

namespace App\Models;

use App\Services\FotoService;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ulasan extends Model
{
    protected $table = 'ulasan';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'user_id', 'destinasi_id', 'judul', 'konten', 'rating', 'foto', 'reports_count', 'is_hidden', 'sentiment',
    ];

    protected $appends = ['foto_urls'];

    protected $casts = [
        'foto' => 'array',
        'is_hidden' => 'boolean',
    ];

    protected function fotoUrls(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (empty($this->foto)) {
                    return [];
                }

                $service = app(FotoService::class);

                return array_map(fn ($f) => $service->url($f), $this->foto);
            },
        );
    }

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

    public function reports(): HasMany
    {
        return $this->hasMany(UlasanReport::class);
    }

    public function komentar(): HasMany
    {
        return $this->hasMany(UlasanKomentar::class);
    }
}
