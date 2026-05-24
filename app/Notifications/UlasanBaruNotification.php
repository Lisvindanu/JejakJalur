<?php

namespace App\Notifications;

use App\Models\Ulasan;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class UlasanBaruNotification extends Notification
{
    use Queueable;

    public function __construct(private Ulasan $ulasan) {}

    /** @return string[] */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'tipe' => 'ulasan_baru',
            'pesan' => "{$this->ulasan->user->name} menambahkan ulasan untuk {$this->ulasan->destinasi->nama}",
            'url' => "/destinasi/{$this->ulasan->destinasi_id}",
            'destinasi_nama' => $this->ulasan->destinasi->nama,
            'reviewer_nama' => $this->ulasan->user->name,
            'rating' => $this->ulasan->rating,
        ];
    }
}
