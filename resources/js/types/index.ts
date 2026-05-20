export type * from './auth';

export type Flash = {
    sukses?: string;
    error?: string;
};

export type SharedProps = {
    auth: import('./auth').Auth;
    flash: Flash;
    name: string;
};

export type Stasiun = {
    id: string;
    nama: string;
    kode_stasiun: string;
    lat?: string | null;
    lng?: string | null;
    kota?: Kota;
};

export type Kota = {
    id: string;
    nama: string;
    kode_ibukota: string;
    stasiun: Stasiun[];
};

export type Destinasi = {
    id: string;
    nama: string;
    deskripsi: string;
    alamat: string;
    kategori: 'Wisata' | 'Kuliner' | 'UMKM';
    rating: string;
    foto: string | null;
    foto_url?: string | null;
    is_verified: boolean;
    stasiun: {
        id?: string;
        nama: string;
        kode_stasiun?: string;
        kota: { id?: string; nama: string };
    };
    ulasan?: Ulasan[];
};

export type Ulasan = {
    id: string;
    rating: number;
    judul?: string | null;
    konten: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        avatar?: string | null;
    };
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
