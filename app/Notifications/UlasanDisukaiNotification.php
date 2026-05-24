<?php

namespace App\Notifications;

use App\Models\Ulasan;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class UlasanDisukaiNotification extends Notification
{
    use Queueable;

    public function __construct(private Ulasan $ulasan, private User $liker) {}

    /** @return string[] */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'tipe' => 'ulasan_disukai',
            'pesan' => "{$this->liker->name} menyukai ulasan kamu untuk {$this->ulasan->destinasi->nama}",
            'url' => "/destinasi/{$this->ulasan->destinasi_id}",
            'destinasi_nama' => $this->ulasan->destinasi->nama,
            'liker_nama' => $this->liker->name,
        ];
    }
}
