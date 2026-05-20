<?php

namespace App\Models;

use App\Observers\DestinasiObserver;
use App\Services\FotoService;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ObservedBy(DestinasiObserver::class)]
class Destinasi extends Model
{
    protected $table = 'destinasi';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'stasiun_id', 'nama', 'deskripsi', 'alamat', 'lat', 'lng',
        'kategori', 'rating', 'foto', 'is_verified',
    ];

    protected $appends = ['foto_url'];

    protected $casts = [
        'is_verified' => 'boolean',
        'rating' => 'decimal:2',
    ];

    public function stasiun(): BelongsTo
    {
        return $this->belongsTo(Stasiun::class);
    }

    public function ulasan(): HasMany
    {
        return $this->hasMany(Ulasan::class);
    }

    protected function fotoUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (! $this->foto) {
                    return null;
                }
                try {
                    return app(FotoService::class)->url($this->foto);
                } catch (\Throwable) {
                    return null;
                }
            },
        );
    }

    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        if (! $term) {
            return $query;
        }

        return $query->whereRaw(
            'nama % ? OR nama ILIKE ?',
            [$term, "%{$term}%"]
        );
    }

    public function updateRating(): void
    {
        $this->rating = $this->ulasan()->avg('rating') ?? 0;
        $this->save();
    }
}
