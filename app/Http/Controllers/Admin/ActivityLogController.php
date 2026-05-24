<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminLog;
use Inertia\Inertia;
use Inertia\Response;

class ActivityLogController extends Controller
{
    public function indeks(): Response
    {
        $logs = AdminLog::with('admin:id,name')
            ->orderByDesc('created_at')
            ->paginate(50)
            ->through(fn (AdminLog $log) => [
                'id' => $log->id,
                'aksi' => $log->aksi,
                'model_type' => $log->model_type ? class_basename($log->model_type) : null,
                'model_id' => $log->model_id,
                'deskripsi' => $log->deskripsi,
                'admin_name' => $log->admin?->name ?? 'Sistem',
                'created_at' => $log->created_at?->format('d M Y H:i'),
            ]);

        return Inertia::render('Admin/ActivityLog/Indeks', ['logs' => $logs]);
    }
}
