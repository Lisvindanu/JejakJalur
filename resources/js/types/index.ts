export type * from './auth';

export type Flash = {
    sukses?: string;
    error?: string;
};

export type SharedProps = {
    notifikasi_belum_dibaca: number;
    auth: import('./auth').Auth;
    flash: Flash;
    name: string;
};

export type Stasiun = {
    id: string;
    nama: string;
    kode_stasiun: string;
    lat?: number | null;
    lng?: number | null;
    kota?: Kota;
    destinasi_count?: number;
    /** Mode kereta yang menyinggahi stasiun ini (derived dari koneksi_stasiun.tipe) */
    jenis_layanan?: Array<'antarkota' | 'commuter' | 'kcic'>;
};

export type Kota = {
    id: string;
    nama: string;
    kode_ibukota: string;
    foto?: string | null;
    stasiun: Stasiun[];
    destinasi_count?: number;
};

export type Destinasi = {
    id: string;
    nama: string;
    deskripsi: string;
    alamat: string;
    lat?: number | null;
    lng?: number | null;
    kategori: 'Wisata' | 'Kuliner' | 'UMKM';
    rating: string;
    foto: string | null;
    foto_url?: string | null;
    is_verified: boolean;
    user_id?: string | null;
    ulasan_count?: number;
    created_at?: string | null;
    telepon?: string | null;
    website?: string | null;
    harga_min?: number | null;
    harga_max?: number | null;
    jam_operasional?: Record<string, { buka: string; tutup: string } | null> | null;
    tags?: string[] | null;
    musim_mulai?: string | null;
    musim_selesai?: string | null;
    galeri?: Array<{ id: string; url: string; url_resolved: string | null; urutan: number }>;
    stasiun: {
        id?: string;
        nama: string;
        kode_stasiun?: string;
        lat?: number | null;
        lng?: number | null;
        kota: { id?: string; nama: string };
    };
    ulasan?: Ulasan[];
};

export type UlasanKomentar = {
    id: number;
    konten: string;
    is_admin: boolean;
    created_at: string;
    user: {
        id: number;
        name: string;
        avatar?: string | null;
    };
};

export type Ulasan = {
    id: string;
    rating: number;
    judul?: string | null;
    konten: string;
    created_at: string;
    updated_at: string;
    likes_count?: number;
    foto_urls?: string[];
    sentiment?: 'positif' | 'negatif' | 'netral' | null;
    komentar?: UlasanKomentar[];
    user: {
        id: number;
        name: string;
        avatar?: string | null;
    };
};

export type StasiunRute = {
    id: string;
    nama: string;
    kode_stasiun: string;
    lat?: string | null;
    lng?: string | null;
    destinasi_count?: number;
    kota: { id: string; nama: string };
};

export type RuteSegment = {
    dari_id: string;
    ke_id: string;
    jarak_km: number;
    geometry?: {
        type: 'LineString';
        coordinates: [number, number][];
    } | null;
    reversed?: boolean;
};

export type UlasanProfil = {
    id: string;
    judul?: string | null;
    konten: string;
    rating: number;
    created_at: string;
    destinasi: {
        id: string;
        nama: string;
        kategori: string;
        foto_url?: string | null;
    };
};

export type BookmarkProfil = {
    id: string;
    destinasi: {
        id: string;
        nama: string;
        kategori: string;
        rating: string;
        foto_url?: string | null;
    };
};

export type KunjunganProfil = {
    id: string;
    destinasi: {
        id: string;
        nama: string;
        kategori: string;
        rating: string;
        foto_url?: string | null;
    };
};

export type WishListProfil = {
    id: string;
    tanggal_rencana: string | null;
    catatan: string | null;
    destinasi: {
        id: string;
        nama: string;
        kategori: string;
        rating: string;
        foto_url?: string | null;
    };
};

export type RuteFavoritProfil = {
    id: number;
    nama: string;
    dari_kode: string;
    ke_kode: string;
    dari_nama: string;
    ke_nama: string;
    mode: 'antarkota' | 'commuter' | 'kcic';
};

export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: Array<{ url: string | null; label: string; active: boolean }>;
};
