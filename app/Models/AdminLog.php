<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdminLog extends Model
{
    public $timestamps = false;

    protected $fillable = ['admin_id', 'aksi', 'model_type', 'model_id', 'deskripsi'];

    public $guarded = [];

    /** @param  array<string, mixed>  $extra */
    public static function catat(string $aksi, ?string $modelType = null, ?string $modelId = null, ?string $deskripsi = null): void
    {
        static::create([
            'admin_id' => auth()->id(),
            'aksi' => $aksi,
            'model_type' => $modelType,
            'model_id' => $modelId,
            'deskripsi' => $deskripsi,
        ]);
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
