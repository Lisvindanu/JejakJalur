import { Head, Link, useForm } from '@inertiajs/react';
import {
    IconArrowLeft,
    IconCurrentLocation,
    IconInfoCircle,
    IconPhoto,
} from '@tabler/icons-react';
import { useState } from 'react';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import TextArea from '@/components/elements/TextArea';
import PublicLayout from '@/components/layouts/PublicLayout';
import type { Destinasi } from '@/types';

type StasiunOption = {
    id: string;
    nama: string;
    kota: { nama: string };
};

interface Props {
    destinasi?: Destinasi;
    semuaStasiun: StasiunOption[];
}

const kategoriOptions = [
    { value: 'Wisata', label: 'Wisata' },
    { value: 'Kuliner', label: 'Kuliner' },
    { value: 'UMKM', label: 'UMKM' },
];

export default function Formulir({ destinasi, semuaStasiun }: Props) {
    const isEdit = !!destinasi;
    const [gpsStatus, setGpsStatus] = useState<
        'idle' | 'loading' | 'error' | 'success'
    >('idle');
    const [gpsError, setGpsError] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<{
        nama: string;
        deskripsi: string;
        alamat: string;
        lat: string;
        lng: string;
        kategori: string;
        stasiun_id: string;
        foto: File | null;
        _method?: string;
    }>({
        nama: destinasi?.nama ?? '',
        deskripsi: destinasi?.deskripsi ?? '',
        alamat: destinasi?.alamat ?? '',
        lat: destinasi?.lat != null ? String(destinasi.lat) : '',
        lng: destinasi?.lng != null ? String(destinasi.lng) : '',
        kategori: destinasi?.kategori ?? '',
        stasiun_id: destinasi?.stasiun?.id ?? '',
        foto: null,
        ...(isEdit ? { _method: 'PATCH' } : {}),
    });

    function ambilLokasiGps() {
        if (!('geolocation' in navigator)) {
            setGpsStatus('error');
            setGpsError('Browser kamu tidak mendukung GPS.');
            return;
        }

        setGpsStatus('loading');
        setGpsError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setData((prev) => ({
                    ...prev,
                    lat: position.coords.latitude.toFixed(6),
                    lng: position.coords.longitude.toFixed(6),
                }));
                setGpsStatus('success');
            },
            (err) => {
                setGpsStatus('error');
                if (err.code === err.PERMISSION_DENIED) {
                    setGpsError(
                        'Izin lokasi ditolak. Aktifkan di pengaturan browser.',
                    );
                } else if (err.code === err.POSITION_UNAVAILABLE) {
                    setGpsError('Lokasi tidak tersedia. Coba di luar ruangan.');
                } else if (err.code === err.TIMEOUT) {
                    setGpsError('Timeout mengambil lokasi. Coba lagi.');
                } else {
                    setGpsError('Gagal mengambil lokasi.');
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            post(`/destinasi/${destinasi.id}`, { forceFormData: true });
        } else {
            post('/destinasi', { forceFormData: true });
        }
    }

    const stasiunOptions = semuaStasiun.map((s) => ({
        value: s.id,
        label: `${s.nama} — ${s.kota.nama}`,
    }));

    return (
        <PublicLayout>
            <Head
                title={`${isEdit ? 'Edit' : 'Tambah'} Destinasi — JejakJalur`}
            />

            {/* Page header */}
            <div className="border-b border-stone-200 bg-stone-50 px-[max(24px,calc(50%-576px))] pt-24 pb-8">
                <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-emerald-700 uppercase">
                    {isEdit ? 'Edit Submission' : 'Submission Baru'}
                </p>
                <h1
                    className="font-serif leading-tight font-normal text-stone-800"
                    style={{ fontSize: 'clamp(28px,4vw,38px)' }}
                >
                    {isEdit ? 'Edit Destinasi' : 'Tambah Destinasi'}
                </h1>
                <p className="mt-2 max-w-[640px] text-sm text-stone-500">
                    {isEdit
                        ? 'Perbarui detail destinasi sebelum diverifikasi admin.'
                        : 'Bagikan destinasi favoritmu. Akan ditampilkan ke publik setelah diverifikasi admin.'}
                </p>
            </div>

            {/* Form */}
            <div className="px-[max(24px,calc(50%-576px))] py-10">
                <Link
                    href="/destinasi/milik-saya"
                    className="mb-5 inline-flex items-center gap-1.5 text-sm text-stone-500 no-underline transition-colors hover:text-emerald-700"
                >
                    <IconArrowLeft size={15} />
                    Kembali ke Destinasi Saya
                </Link>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-[680px] space-y-5"
                >
                    <Input
                        label="Nama Destinasi"
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                        error={errors.nama}
                        placeholder="cth. Pantai Parangtritis"
                        required
                    />

                    <TextArea
                        label="Deskripsi"
                        value={data.deskripsi}
                        onChange={(e) => setData('deskripsi', e.target.value)}
                        error={errors.deskripsi}
                        placeholder="Cerita singkat: apa yang bikin destinasi ini menarik?"
                        rows={5}
                        helper="Maks 2000 karakter."
                    />

                    <Input
                        label="Alamat"
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                        error={errors.alamat}
                        placeholder="cth. Jl. Parangtritis Km.28, Bantul"
                        required
                    />

                    <Select
                        label="Kategori"
                        value={data.kategori}
                        onChange={(e) => setData('kategori', e.target.value)}
                        options={kategoriOptions}
                        placeholder="Pilih kategori..."
                        error={errors.kategori}
                    />

                    <Select
                        label="Stasiun Terdekat"
                        value={data.stasiun_id}
                        onChange={(e) => setData('stasiun_id', e.target.value)}
                        options={stasiunOptions}
                        placeholder="Pilih stasiun..."
                        error={errors.stasiun_id}
                    />

                    {/* Koordinat */}
                    <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4">
                        <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-stone-700">
                                    Koordinat (opsional)
                                </p>
                                <p className="mt-0.5 text-xs text-stone-500">
                                    Bantu pengunjung menemukan lokasi tepat di
                                    peta.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={ambilLokasiGps}
                                loading={gpsStatus === 'loading'}
                                leftIcon={<IconCurrentLocation size={14} />}
                            >
                                Pakai GPS
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Latitude"
                                value={data.lat}
                                onChange={(e) =>
                                    setData('lat', e.target.value)
                                }
                                error={errors.lat}
                                placeholder="-7.888800"
                                type="number"
                                step="any"
                            />
                            <Input
                                label="Longitude"
                                value={data.lng}
                                onChange={(e) =>
                                    setData('lng', e.target.value)
                                }
                                error={errors.lng}
                                placeholder="110.333300"
                                type="number"
                                step="any"
                            />
                        </div>

                        {gpsStatus === 'success' && (
                            <p className="mt-2 text-xs text-emerald-700">
                                Lokasi GPS berhasil diambil.
                            </p>
                        )}
                        {gpsStatus === 'error' && gpsError && (
                            <p className="mt-2 text-xs text-red-600">
                                {gpsError}
                            </p>
                        )}
                    </div>

                    {/* Foto upload */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-stone-700">
                            Foto (opsional)
                        </label>

                        {isEdit && destinasi.foto_url && !data.foto && (
                            <div className="mb-3">
                                <img
                                    src={destinasi.foto_url}
                                    alt={destinasi.nama}
                                    className="h-36 w-56 rounded-lg border border-stone-200 object-cover"
                                />
                                <p className="mt-1 text-xs text-stone-400">
                                    Foto saat ini
                                </p>
                            </div>
                        )}

                        {data.foto && (
                            <div className="mb-3">
                                <img
                                    src={URL.createObjectURL(data.foto)}
                                    alt="Preview"
                                    className="h-36 w-56 rounded-lg border border-stone-200 object-cover"
                                />
                                <p className="mt-1 text-xs text-stone-400">
                                    Preview foto baru
                                </p>
                            </div>
                        )}

                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-500 transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700">
                            <IconPhoto size={16} />
                            <span>
                                {data.foto
                                    ? data.foto.name
                                    : isEdit
                                      ? 'Ganti foto'
                                      : 'Pilih foto...'}
                            </span>
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                className="hidden"
                                onChange={(e) =>
                                    setData(
                                        'foto',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                            />
                        </label>
                        {errors.foto && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.foto}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-stone-400">
                            JPG/PNG/WEBP, maks 2MB.
                        </p>
                    </div>

                    {/* Info box */}
                    <div className="flex gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
                        <IconInfoCircle
                            size={16}
                            className="mt-0.5 shrink-0 text-amber-600"
                        />
                        <p>
                            Submission akan ditinjau admin sebelum tampil di
                            halaman publik. Kamu bisa mengeditnya selama belum
                            diverifikasi.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Link href="/destinasi/milik-saya">
                            <Button variant="ghost" size="md" type="button">
                                Batal
                            </Button>
                        </Link>
                        <Button
                            variant="primary"
                            size="md"
                            type="submit"
                            loading={processing}
                        >
                            {isEdit ? 'Simpan Perubahan' : 'Kirim Destinasi'}
                        </Button>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
