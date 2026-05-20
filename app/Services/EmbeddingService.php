<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class EmbeddingService
{
    private string $endpoint;

    private string $model;

    public function __construct()
    {
        $this->endpoint = config('services.ollama.embed_endpoint', 'http://localhost:11434/api/embed');
        $this->model = config('services.ollama.embed_model', 'nomic-embed-text');
    }

    /**
     * Generate a vector embedding for the given text.
     *
     * @return float[]|null
     */
    public function embed(string $text): ?array
    {
        try {
            $response = Http::timeout(15)->post($this->endpoint, [
                'model' => $this->model,
                'input' => $text,
            ]);

            if ($response->successful()) {
                return $response->json('embeddings.0');
            }

            Log::warning('EmbeddingService: failed', ['status' => $response->status()]);
        } catch (\Exception $e) {
            Log::warning('EmbeddingService: exception', ['msg' => $e->getMessage()]);
        }

        return null;
    }

    /**
     * Format a float array as a PostgreSQL vector literal.
     *
     * @param  float[]  $embedding
     */
    public function toSql(array $embedding): string
    {
        return '['.implode(',', $embedding).']';
    }
}
