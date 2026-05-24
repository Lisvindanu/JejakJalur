import { Head, Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconPhoto, IconTrash } from '@tabler/icons-react';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import TextArea from '@/components/elements/TextArea';
import Select from '@/components/elements/Select';
import FormCard from '@/components/fragments/Admin/FormCard';
import AdminLayout from '@/components/layouts/AdminLayout';
import { MOCK_STASIUN } from '@/lib/mock-data';
import type { Destinasi } from '@/types';

interface GaleriItem {
    id: string;
    url: string;
    url_resolved: string | null;
    urutan: number;
}

interface Props {
    destinasi?: Destinasi & { galeri?: GaleriItem[] };
    semuaStasiun?: Array<{ id: string; nama: string; kota: { nama: string } }>;
}

const kategoriOptions = [
    { value: 'Wisata', label: 'Wisata' },
    { value: 'Kuliner', label: 'Kuliner' },
    { value: 'UMKM', label: 'UMKM' },
];

const HARI_LIST = [
    { key: 'senin', label: 'Senin' },
    { key: 'selasa', label: 'Selasa' },
    { key: 'rabu', label: 'Rabu' },
    { key: 'kamis', label: 'Kamis' },
    { key: 'jumat', label: 'Jumat' },
    { key: 'sabtu', label: 'Sabtu' },
    { key: 'minggu', label: 'Minggu' },
] as const;

type HariKey = (typeof HARI_LIST)[number]['key'];
type JamSlot = { buka: string; tutup: string } | null;
type JamOperasional = Partial<Record<HariKey, JamSlot>>;

export default function DestinasiFormulir({
    destinasi,
    semuaStasiun: stasiunProp,
}: Props) {
    const semuaStasiun = (stasiunProp ?? MOCK_STASIUN) as Array<{
        id: string;
        nama: string;
        kota: { nama: string };
    }>;
    const isEdit = !!destinasi;

    const { data, setData, post, processing, errors } = useForm<{
        nama: string;
        deskripsi: string;
        alamat: string;
        lat: string;
        lng: string;
        kategori: string;
        stasiun_id: string;
        foto: File | null;
        galeri: File[];
        hapus_galeri: string[];
        telepon: string;
        website: string;
        harga_min: string;
        harga_max: string;
        musim_mulai: string;
        musim_selesai: string;
        jam_operasional: JamOperasional;
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
        galeri: [],
        hapus_galeri: [],
        telepon: destinasi?.telepon ?? '',
        website: destinasi?.website ?? '',
        harga_min:
            destinasi?.harga_min != null ? String(destinasi.harga_min) : '',
        harga_max:
            destinasi?.harga_max != null ? String(destinasi.harga_max) : '',
        musim_mulai: (destinasi as any)?.musim_mulai ?? '',
        musim_selesai: (destinasi as any)?.musim_selesai ?? '',
        jam_operasional: (destinasi?.jam_operasional as JamOperasional) ?? {},
        ...(isEdit ? { _method: 'PATCH' } : {}),
    });

    function setJamHari(hari: HariKey, slot: JamSlot) {
        setData('jam_operasional', { ...data.jam_operasional, [hari]: slot });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            post(`/admin/destinasi/${destinasi.id}`, { forceFormData: true });
        } else {
            post('/admin/destinasi', { forceFormData: true });
        }
    }

    const stasiunOptions = semuaStasiun.map((s) => ({
        value: s.id,
        label: `${s.nama} — ${s.kota.nama}`,
    }));

    return (
        <AdminLayout title={isEdit ? 'Edit Destinasi' : 'Tambah Destinasi'}>
            <Head
                title={`${isEdit ? 'Edit' : 'Tambah'} Destinasi — Admin JejakJalur`}
            />

            <div className="space-y-4">
                <Link
                    href="/admin/destinasi"
                    className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-stone-800"
                >
                    <IconArrowLeft size={15} />
                    Kembali ke Destinasi
                </Link>

                <form onSubmit={handleSubmit}>
                    <FormCard
                        title={
                            isEdit ? 'Edit Destinasi' : 'Tambah Destinasi Baru'
                        }
                        description={
                            isEdit
                                ? `Mengubah data destinasi ${destinasi.nama}.`
                                : 'Isi detail destinasi yang akan ditambahkan ke sistem.'
                        }
                        footer={
                            <>
                                <Link href="/admin/destinasi">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                    >
                                        Batal
                                    </Button>
                                </Link>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    type="submit"
                                    loading={processing}
                                >
                                    {isEdit
                                        ? 'Simpan Perubahan'
                                        : 'Tambah Destinasi'}
                                </Button>
                            </>
                        }
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
                            onChange={(e) =>
                                setData('deskripsi', e.target.value)
                            }
                            error={errors.deskripsi}
                            placeholder="Tulis deskripsi singkat tentang destinasi ini..."
                            rows={4}
                        />

                        <Input
                            label="Alamat"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            error={errors.alamat}
                            placeholder="cth. Jl. Parangtritis Km.28, Bantul"
                            required
                        />

                        <div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Latitude (opsional)"
                                    value={data.lat}
                                    onChange={(e) =>
                                        setData('lat', e.target.value)
                                    }
                                    error={errors.lat}
                                    placeholder="cth. -7.8888"
                                    type="number"
                                    step="any"
                                />
                                <Input
                                    label="Longitude (opsional)"
                                    value={data.lng}
                                    onChange={(e) =>
                                        setData('lng', e.target.value)
                                    }
                                    error={errors.lng}
                                    placeholder="cth. 110.3333"
                                    type="number"
                                    step="any"
                                />
                            </div>
                            <p className="mt-1 text-xs text-stone-400">
                                Kosongkan untuk auto-geocode dari alamat.
                            </p>
                        </div>

                        <Select
                            label="Kategori"
                            value={data.kategori}
                            onChange={(e) =>
                                setData('kategori', e.target.value)
                            }
                            options={kategoriOptions}
                            placeholder="Pilih kategori..."
                            error={errors.kategori}
                        />

                        <Select
                            label="Stasiun Terdekat"
                            value={data.stasiun_id}
                            onChange={(e) =>
                                setData('stasiun_id', e.target.value)
                            }
                            options={stasiunOptions}
                            placeholder="Pilih stasiun..."
                            error={errors.stasiun_id}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Telepon (opsional)"
                                value={data.telepon}
                                onChange={(e) =>
                                    setData('telepon', e.target.value)
                                }
                                error={errors.telepon}
                                placeholder="cth. 0812-3456-7890"
                            />
                            <Input
                                label="Website (opsional)"
                                value={data.website}
                                onChange={(e) =>
                                    setData('website', e.target.value)
                                }
                                error={errors.website}
                                placeholder="https://..."
                                type="url"
                            />
                        </div>

                        <div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Harga Min (opsional)"
                                    value={data.harga_min}
                                    onChange={(e) =>
                                        setData('harga_min', e.target.value)
                                    }
                                    error={errors.harga_min}
                                    placeholder="cth. 0 (gratis)"
                                    type="number"
                                    min="0"
                                />
                                <Input
                                    label="Harga Max (opsional)"
                                    value={data.harga_max}
                                    onChange={(e) =>
                                        setData('harga_max', e.target.value)
                                    }
                                    error={errors.harga_max}
                                    placeholder="cth. 50000"
                                    type="number"
                                    min="0"
                                />
                            </div>
                            <p className="mt-1 text-xs text-stone-400">
                                Isi 0 untuk menandai gratis. Kosongkan kalau
                                belum diketahui.
                            </p>
                        </div>

                        {/* Musim */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-stone-700">
                                Musim / Periode Tersedia (opsional)
                            </label>
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs text-stone-500">Mulai (MM-DD)</label>
                                    <input
                                        type="text"
                                        value={data.musim_mulai}
                                        onChange={(e) => setData('musim_mulai', e.target.value)}
                                        placeholder="cth. 12-20"
                                        maxLength={5}
                                        className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>
                                <span className="shrink-0 text-stone-400">–</span>
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs text-stone-500">Selesai (MM-DD)</label>
                                    <input
                                        type="text"
                                        value={data.musim_selesai}
                                        onChange={(e) => setData('musim_selesai', e.target.value)}
                                        placeholder="cth. 01-10"
                                        maxLength={5}
                                        className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <p className="mt-1 text-xs text-stone-400">
                                Kosongkan jika tersedia sepanjang tahun. Contoh: Durian musim 12-01 s.d. 02-28.
                            </p>
                        </div>

                        {/* Jam operasional */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-stone-700">
                                Jam Operasional (opsional)
                            </label>
                            <div className="space-y-2 rounded-lg border border-stone-200 p-3">
                                {HARI_LIST.map(({ key, label }) => {
                                    const slot =
                                        data.jam_operasional[key] ?? null;
                                    const isBuka = slot !== null;
                                    return (
                                        <div
                                            key={key}
                                            className="flex flex-wrap items-center gap-3"
                                        >
                                            <label className="flex w-20 cursor-pointer items-center gap-2 text-sm text-stone-700">
                                                <input
                                                    type="checkbox"
                                                    checked={isBuka}
                                                    onChange={(e) =>
                                                        setJamHari(
                                                            key,
                                                            e.target.checked
                                                                ? {
                                                                      buka: '08:00',
                                                                      tutup: '21:00',
                                                                  }
                                                                : null,
                                                        )
                                                    }
                                                    className="rounded border-stone-300 text-emerald-600"
                                                />
                                                {label}
                                            </label>
                                            {isBuka && slot && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <input
                                                        type="time"
                                                        value={slot.buka}
                                                        onChange={(e) =>
                                                            setJamHari(key, {
                                                                ...slot,
                                                                buka: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="rounded-lg border border-stone-200 px-2 py-1 text-sm text-stone-700"
                                                    />
                                                    <span className="text-stone-400">
                                                        –
                                                    </span>
                                                    <input
                                                        type="time"
                                                        value={slot.tutup}
                                                        onChange={(e) =>
                                                            setJamHari(key, {
                                                                ...slot,
                                                                tutup: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="rounded-lg border border-stone-200 px-2 py-1 text-sm text-stone-700"
                                                    />
                                                </div>
                                            )}
                                            {!isBuka && (
                                                <span className="text-xs text-stone-400">
                                                    Tutup
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Foto upload */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-stone-700">
                                Foto
                            </label>

                            {/* Current foto preview */}
                            {isEdit && destinasi.foto && !data.foto && (
                                <div className="mb-3">
                                    <img
                                        src={destinasi.foto}
                                        alt={destinasi.nama}
                                        className="h-32 w-48 rounded-lg border border-stone-200 object-cover"
                                    />
                                    <p className="mt-1 text-xs text-stone-400">
                                        Foto saat ini
                                    </p>
                                </div>
                            )}

                            {/* New foto preview */}
                            {data.foto && (
                                <div className="mb-3">
                                    <img
                                        src={URL.createObjectURL(data.foto)}
                                        alt="Preview"
                                        className="h-32 w-48 rounded-lg border border-stone-200 object-cover"
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
                                          ? 'Ganti foto (opsional)'
                                          : 'Pilih foto...'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
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
                        </div>

                        {/* Galeri foto tambahan */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-stone-700">
                                Galeri Foto (opsional, maks. 10)
                            </label>

                            {/* Existing galeri */}
                            {isEdit && (destinasi as any)?.galeri?.length > 0 && (
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {((destinasi as any).galeri as GaleriItem[]).map((g) => {
                                        const isMarked = data.hapus_galeri.includes(g.id);
                                        return (
                                            <div key={g.id} className="relative">
                                                <img
                                                    src={g.url_resolved ?? g.url}
                                                    alt=""
                                                    className={`h-20 w-24 rounded-lg border object-cover transition-opacity ${isMarked ? 'border-red-400 opacity-40' : 'border-stone-200'}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setData('hapus_galeri', isMarked
                                                            ? data.hapus_galeri.filter((id) => id !== g.id)
                                                            : [...data.hapus_galeri, g.id])
                                                    }
                                                    className={`absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border ${isMarked ? 'border-red-400 bg-red-500 text-white' : 'border-stone-300 bg-white text-stone-500 hover:bg-red-50 hover:text-red-500'}`}
                                                    title={isMarked ? 'Batalkan hapus' : 'Hapus foto ini'}
                                                >
                                                    <IconTrash size={11} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-500 transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700">
                                <IconPhoto size={16} />
                                <span>
                                    {data.galeri.length > 0
                                        ? `${data.galeri.length} foto dipilih`
                                        : 'Tambah foto galeri...'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) =>
                                        setData('galeri', Array.from(e.target.files ?? []))
                                    }
                                />
                            </label>
                        </div>
                    </FormCard>
                </form>
            </div>
        </AdminLayout>
    );
}
