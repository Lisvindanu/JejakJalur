<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfilRequest;
use App\Models\Destinasi;
use App\Services\FotoService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfilController extends Controller
{
    public function __construct(private FotoService $fotoService) {}

    public function tampilkan(): Response
    {
        $pengguna = auth()->user();

        $jumlah_ulasan = $pengguna->ulasan()->count();
        $rata_rata_rating = $pengguna->ulasan()->avg('rating');
        $jumlah_destinasi_diulas = $pengguna->ulasan()->distinct('destinasi_id')->count('destinasi_id');
        $streak_ulasan = $this->hitungStreakUlasan($pengguna);
        $badges = $this->hitungBadges($pengguna, $jumlah_ulasan, $rata_rata_rating, $streak_ulasan);
        $gamifikasi = $this->hitungGamifikasi($pengguna, $jumlah_ulasan, $jumlah_destinasi_diulas);

        $ulasan = $pengguna->ulasan()
            ->with('destinasi:id,nama,kategori,foto,stasiun_id')
            ->latest()
            ->paginate(5, ['*'], 'ulasan_page')
            ->through(fn ($u) => [
                'id' => $u->id,
                'judul' => $u->judul,
                'konten' => $u->konten,
                'rating' => $u->rating,
                'created_at' => $u->created_at,
                'destinasi' => [
                    'id' => $u->destinasi->id,
                    'nama' => $u->destinasi->nama,
                    'kategori' => $u->destinasi->kategori,
                    'foto_url' => $u->destinasi->foto_url,
                ],
            ]);

        $bookmarks = $pengguna->bookmarks()
            ->with('destinasi:id,nama,kategori,foto,rating,stasiun_id')
            ->latest()
            ->paginate(8, ['*'], 'bookmark_page')
            ->through(fn ($b) => [
                'id' => $b->id,
                'destinasi' => [
                    'id' => $b->destinasi->id,
                    'nama' => $b->destinasi->nama,
                    'kategori' => $b->destinasi->kategori,
                    'rating' => $b->destinasi->rating,
                    'foto_url' => $b->destinasi->foto_url,
                ],
            ]);

        $kunjungan = $pengguna->kunjungan()
            ->with('destinasi:id,nama,kategori,foto,rating,stasiun_id')
            ->latest()
            ->paginate(8, ['*'], 'kunjungan_page')
            ->through(fn ($k) => [
                'id' => $k->id,
                'destinasi' => [
                    'id' => $k->destinasi->id,
                    'nama' => $k->destinasi->nama,
                    'kategori' => $k->destinasi->kategori,
                    'rating' => $k->destinasi->rating,
                    'foto_url' => $k->destinasi->foto_url,
                ],
            ]);

        $ruteFavorit = $pengguna->ruteFavorit()
            ->latest()
            ->paginate(10, ['*'], 'rute_page');

        return Inertia::render('Profil/Tampilkan', [
            'pengguna' => $pengguna,
            'jumlah_ulasan' => $jumlah_ulasan,
            'rata_rata_rating' => $rata_rata_rating ? round($rata_rata_rating, 1) : null,
            'jumlah_destinasi_diulas' => $jumlah_destinasi_diulas,
            'streak_ulasan' => $streak_ulasan,
            'badges' => $badges,
            'gamifikasi' => $gamifikasi,
            'ulasan' => $ulasan,
            'bookmarks' => $bookmarks,
            'kunjungan' => $kunjungan,
            'ruteFavorit' => $ruteFavorit,
            'jumlah_following' => $pengguna->following()->count(),
            'jumlah_followers' => $pengguna->followers()->count(),
        ]);
    }

    /**
     * @return array{poin: int, level: string, level_idx: int, poin_ke_level_berikutnya: int|null, nama_level_berikutnya: string|null}
     */
    private function hitungGamifikasi(mixed $pengguna, int $jumlahUlasan, int $jumlahDestinasiDiulas): array
    {
        $jumlahKunjungan = $pengguna->kunjungan()->count();
        $jumlahBookmark = $pengguna->bookmarks()->count();
        $jumlahFotoUlasan = $pengguna->ulasan()->whereNotNull('foto')->count();
        $jumlahDestinasiBaru = Destinasi::where('user_id', $pengguna->id)->count();

        $poin = ($jumlahUlasan * 10)
            + ($jumlahDestinasiDiulas * 3)
            + ($jumlahFotoUlasan * 5)
            + ($jumlahKunjungan * 2)
            + ($jumlahBookmark * 1)
            + ($jumlahDestinasiBaru * 20);

        $levels = [
            ['nama' => 'Pejalan Baru', 'min' => 0],
            ['nama' => 'Railfan', 'min' => 100],
            ['nama' => 'Penjelajah', 'min' => 300],
            ['nama' => 'Maestro Jalur', 'min' => 700],
        ];

        $levelIdx = 0;
        foreach ($levels as $i => $l) {
            if ($poin >= $l['min']) {
                $levelIdx = $i;
            }
        }

        $levelBerikutnya = $levels[$levelIdx + 1] ?? null;

        return [
            'poin' => $poin,
            'level' => $levels[$levelIdx]['nama'],
            'level_idx' => $levelIdx,
            'poin_ke_level_berikutnya' => $levelBerikutnya ? $levelBerikutnya['min'] - $poin : null,
            'nama_level_berikutnya' => $levelBerikutnya ? $levelBerikutnya['nama'] : null,
        ];
    }

    /**
     * @return array<array{id: string, label: string, deskripsi: string, icon: string}>
     */
    private function hitungBadges(mixed $pengguna, int $jumlahUlasan, mixed $rataRating, int $streak): array
    {
        $badges = [];

        if ($jumlahUlasan >= 1) {
            $badges[] = ['id' => 'penjelajah_pertama', 'label' => 'Penjelajah Pertama', 'deskripsi' => 'Menulis ulasan pertama', 'icon' => '🗺️'];
        }
        if ($jumlahUlasan >= 10) {
            $badges[] = ['id' => 'kritikus', 'label' => 'Kritikus', 'deskripsi' => '10+ ulasan ditulis', 'icon' => '✍️'];
        }
        if ($jumlahUlasan >= 25) {
            $badges[] = ['id' => 'pengulas_aktif', 'label' => 'Pengulas Aktif', 'deskripsi' => '25+ ulasan ditulis', 'icon' => '🏆'];
        }

        $jumlahKunjungan = $pengguna->kunjungan()->count();
        if ($jumlahKunjungan >= 5) {
            $badges[] = ['id' => 'petualang', 'label' => 'Petualang', 'deskripsi' => '5+ destinasi dikunjungi', 'icon' => '🎒'];
        }
        if ($jumlahKunjungan >= 20) {
            $badges[] = ['id' => 'penjelajah_sejati', 'label' => 'Penjelajah Sejati', 'deskripsi' => '20+ destinasi dikunjungi', 'icon' => '🌟'];
        }

        $jumlahBookmark = $pengguna->bookmarks()->count();
        if ($jumlahBookmark >= 5) {
            $badges[] = ['id' => 'kolektor', 'label' => 'Kolektor', 'deskripsi' => '5+ destinasi di-wishlist', 'icon' => '🔖'];
        }

        $jumlahKuliner = $pengguna->bookmarks()
            ->whereHas('destinasi', fn ($q) => $q->where('kategori', 'Kuliner'))
            ->count();
        if ($jumlahKuliner >= 5) {
            $badges[] = ['id' => 'foodie', 'label' => 'Foodie', 'deskripsi' => '5+ destinasi kuliner di-bookmark', 'icon' => '🍜'];
        }

        if ($pengguna->ruteFavorit()->exists()) {
            $badges[] = ['id' => 'railfan', 'label' => 'Railfan', 'deskripsi' => 'Menyimpan rute kereta favorit', 'icon' => '🚂'];
        }

        if ($streak >= 3) {
            $badges[] = ['id' => 'streak_3', 'label' => 'Rutin 3 Bulan', 'deskripsi' => '3 bulan berturut-turut ulasan', 'icon' => '🔥'];
        }
        if ($streak >= 6) {
            $badges[] = ['id' => 'streak_6', 'label' => 'Dedikasi 6 Bulan', 'deskripsi' => '6 bulan berturut-turut ulasan', 'icon' => '⚡'];
        }

        if ($rataRating !== null && $jumlahUlasan >= 5 && (float) $rataRating >= 4.5) {
            $badges[] = ['id' => 'positif', 'label' => 'Jiwa Positif', 'deskripsi' => 'Rata-rata rating ≥ 4.5', 'icon' => '😊'];
        }

        if (Destinasi::where('user_id', $pengguna->id)->exists()) {
            $badges[] = ['id' => 'kontributor', 'label' => 'Kontributor', 'deskripsi' => 'Mengajukan destinasi baru', 'icon' => '✨'];
        }

        return $badges;
    }

    private function hitungStreakUlasan(mixed $pengguna): int
    {
        $months = $pengguna->ulasan()
            ->orderBy('created_at')
            ->pluck('created_at')
            ->map(fn ($d) => $d->format('Y-m'))
            ->unique()
            ->sort()
            ->values();

        if ($months->isEmpty()) {
            return 0;
        }

        $latest = Carbon::createFromFormat('Y-m', $months->last())->startOfMonth();
        $streak = 1;

        for ($i = $months->count() - 2; $i >= 0; $i--) {
            $month = Carbon::createFromFormat('Y-m', $months[$i])->startOfMonth();
            if ($latest->diffInMonths($month) === 1) {
                $streak++;
                $latest = $month;
            } else {
                break;
            }
        }

        return $streak;
    }

    public function edit(): Response
    {
        return Inertia::render('Profil/Edit', [
            'pengguna' => auth()->user(),
        ]);
    }

    public function perbarui(ProfilRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $pengguna = $request->user();
        $pengguna->nama = $data['nama'];
        $pengguna->name = $data['nama'];
        $pengguna->email = $data['email'];

        if ($request->hasFile('avatar')) {
            $pengguna->avatar = $this->fotoService->simpan($request->file('avatar'), 'avatars');
        }

        $pengguna->save();

        return redirect()->route('profil.tampilkan')->with('sukses', 'Profil berhasil diperbarui.');
    }

    public function hapus(): RedirectResponse
    {
        $pengguna = auth()->user();
        auth()->logout();
        $pengguna->delete(); // SoftDelete — UU PDP right to be forgotten

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect()->route('home')->with('sukses', 'Akun Anda telah dihapus.');
    }
}
