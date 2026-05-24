<?php

namespace App\Models;

use App\Services\FotoService;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DestinasiGaleri extends Model
{
    use HasUuids;

    protected $table = 'destinasi_galeri';

    protected $fillable = ['destinasi_id', 'url', 'urutan'];

    protected $appends = ['url_resolved'];

    public function destinasi(): BelongsTo
    {
        return $this->belongsTo(Destinasi::class);
    }

    protected function urlResolved(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (! $this->url) {
                    return null;
                }
                try {
                    return app(FotoService::class)->url($this->url);
                } catch (\Throwable) {
                    return $this->url;
                }
            },
        );
    }
}
