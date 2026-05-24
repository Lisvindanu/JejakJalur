<?php

namespace App\Notifications;

use App\Models\Destinasi;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DestinasiDiverifikasiNotification extends Notification
{
    use Queueable;

    public function __construct(private Destinasi $destinasi) {}

    /** @return string[] */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'tipe' => 'destinasi_diverifikasi',
            'pesan' => "Destinasi \"{$this->destinasi->nama}\" kamu telah diverifikasi admin!",
            'url' => "/destinasi/{$this->destinasi->id}",
            'destinasi_nama' => $this->destinasi->nama,
        ];
    }
}
