<?php

namespace App\Console\Commands;

use App\Models\Destinasi;
use App\Models\Kota;
use App\Models\Stasiun;
use App\Services\EmbeddingService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

#[Signature('jejak:seed-embeddings {--force : Re-embed all records even if embedding exists}')]
#[Description('Generate pgvector embeddings for kota, stasiun, and destinasi')]
class SeedEmbeddings extends Command
{
    public function handle(EmbeddingService $embedding): int
    {
        $force = $this->option('force');

        $this->seedTable(
            $embedding,
            Kota::query()->when(! $force, fn ($q) => $q->whereNull('embedding'))->cursor(),
            fn (Kota $k) => "{$k->nama} kota di Indonesia yang dilalui jalur kereta api",
            'kota',
        );

        $this->seedTable(
            $embedding,
            Stasiun::with('kota')->when(! $force, fn ($q) => $q->whereNull('embedding'))->cursor(),
            fn (Stasiun $s) => "Stasiun {$s->nama} kode {$s->kode_stasiun} di {$s->kota?->nama}",
            'stasiun',
        );

        $this->seedTable(
            $embedding,
            Destinasi::with('stasiun.kota')->when(! $force, fn ($q) => $q->whereNull('embedding'))->cursor(),
            fn (Destinasi $d) => "{$d->nama} {$d->kategori} {$d->deskripsi} dekat Stasiun {$d->stasiun?->nama} {$d->stasiun?->kota?->nama}",
            'destinasi',
        );

        return self::SUCCESS;
    }

    private function seedTable(EmbeddingService $embedding, iterable $rows, callable $toText, string $label): void
    {
        $count = 0;
        $failed = 0;

        foreach ($rows as $row) {
            $vec = $embedding->embed($toText($row));
            if ($vec) {
                DB::table($label)->where('id', $row->id)->update([
                    'embedding' => $embedding->toSql($vec),
                ]);
                $count++;
            } else {
                $failed++;
            }
        }

        $this->line("  {$label}: {$count} embedded, {$failed} failed");
    }
}
