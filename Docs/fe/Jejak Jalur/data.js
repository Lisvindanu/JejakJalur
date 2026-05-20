// JejakJalur dummy data — kota, stasiun, destinasi, ulasan
// Lat/lng nyata untuk peta Leaflet

const KOTA = [
  { id: "k-bdo", nama: "Bandung", kode: "BDO", lat: -6.9147, lng: 107.6098 },
  { id: "k-jkt", nama: "Jakarta", kode: "GMR", lat: -6.2088, lng: 106.8456 },
  { id: "k-sby", nama: "Surabaya", kode: "SBI", lat: -7.2575, lng: 112.7521 },
  { id: "k-yog", nama: "Yogyakarta", kode: "YK", lat: -7.7956, lng: 110.3695 },
  { id: "k-smg", nama: "Semarang", kode: "SMT", lat: -6.9667, lng: 110.4167 },
  { id: "k-mlg", nama: "Malang", kode: "ML", lat: -7.9778, lng: 112.6307 },
  { id: "k-slo", nama: "Solo", kode: "SLO", lat: -7.5662, lng: 110.8281 },
  { id: "k-crb", nama: "Cirebon", kode: "CN", lat: -6.7320, lng: 108.5523 },
];

const STASIUN = [
  // Bandung
  { id: "s-bd", nama: "Bandung", kode: "BD", kotaId: "k-bdo", lat: -6.9145, lng: 107.6024 },
  { id: "s-cmi", nama: "Cimahi", kode: "CMI", kotaId: "k-bdo", lat: -6.8732, lng: 107.5421 },
  { id: "s-kac", nama: "Kiaracondong", kode: "KAC", kotaId: "k-bdo", lat: -6.9304, lng: 107.6463 },
  // Jakarta
  { id: "s-gmr", nama: "Gambir", kode: "GMR", kotaId: "k-jkt", lat: -6.1768, lng: 106.8307 },
  { id: "s-pse", nama: "Pasar Senen", kode: "PSE", kotaId: "k-jkt", lat: -6.1737, lng: 106.8438 },
  { id: "s-jak", nama: "Jakarta Kota", kode: "JAKK", kotaId: "k-jkt", lat: -6.1373, lng: 106.8137 },
  { id: "s-mri", nama: "Manggarai", kode: "MRI", kotaId: "k-jkt", lat: -6.2105, lng: 106.8499 },
  // Surabaya
  { id: "s-sgu", nama: "Surabaya Gubeng", kode: "SGU", kotaId: "k-sby", lat: -7.2649, lng: 112.7522 },
  { id: "s-sbi", nama: "Surabaya Pasarturi", kode: "SBI", kotaId: "k-sby", lat: -7.2453, lng: 112.7297 },
  // Yogya
  { id: "s-yk", nama: "Yogyakarta", kode: "YK", kotaId: "k-yog", lat: -7.7894, lng: 110.3636 },
  { id: "s-lpn", nama: "Lempuyangan", kode: "LPN", kotaId: "k-yog", lat: -7.7889, lng: 110.3776 },
  // Semarang
  { id: "s-smt", nama: "Semarang Tawang", kode: "SMT", kotaId: "k-smg", lat: -6.9647, lng: 110.4275 },
  { id: "s-smc", nama: "Semarang Poncol", kode: "SMC", kotaId: "k-smg", lat: -6.9684, lng: 110.4185 },
  // Malang
  { id: "s-ml", nama: "Malang", kode: "ML", kotaId: "k-mlg", lat: -7.9788, lng: 112.6371 },
  { id: "s-mlk", nama: "Malang Kotalama", kode: "MLK", kotaId: "k-mlg", lat: -7.9925, lng: 112.6336 },
  // Solo
  { id: "s-slo", nama: "Solo Balapan", kode: "SLO", kotaId: "k-slo", lat: -7.5572, lng: 110.8214 },
  { id: "s-sk", nama: "Solo Jebres", kode: "SK", kotaId: "k-slo", lat: -7.5683, lng: 110.8419 },
  // Cirebon
  { id: "s-cn", nama: "Cirebon", kode: "CN", kotaId: "k-crb", lat: -6.7060, lng: 108.5598 },
];

// adjacency for BFS — real-ish Jawa rail topology
const KONEKSI = [
  ["s-gmr", "s-mri"], ["s-mri", "s-jak"], ["s-pse", "s-mri"], ["s-pse", "s-gmr"],
  ["s-gmr", "s-cn"], ["s-cn", "s-smt"], ["s-cn", "s-bd"],
  ["s-bd", "s-cmi"], ["s-bd", "s-kac"], ["s-bd", "s-yk"],
  ["s-smt", "s-smc"], ["s-smc", "s-slo"], ["s-slo", "s-sk"],
  ["s-slo", "s-yk"], ["s-yk", "s-lpn"], ["s-yk", "s-ml"],
  ["s-sgu", "s-sbi"], ["s-slo", "s-sgu"], ["s-sgu", "s-ml"],
  ["s-ml", "s-mlk"],
];

const DESTINASI = [
  { id: "d-1", nama: "Saung Angklung Udjo", kategori: "Wisata", stasiunId: "s-kac", rating: 4.6, ulasanCount: 142, verified: true,
    alamat: "Jl. Padasuka No.118, Bandung", lat: -6.9006, lng: 107.6571,
    deskripsi: "Pertunjukan angklung khas Sunda dan workshop pembuatan alat musik bambu. Tempat budaya legendaris yang berdiri sejak 1966.",
    gradient: "from-emerald-400 to-teal-600", ikon: "music" },
  { id: "d-2", nama: "Tahu Susu Lembang", kategori: "Kuliner", stasiunId: "s-bd", rating: 4.3, ulasanCount: 89, verified: true,
    alamat: "Jl. Raya Lembang, Bandung Barat", lat: -6.8118, lng: 107.6171,
    deskripsi: "Tahu sutra dengan tekstur lembut dan aroma susu yang khas. Oleh-oleh ikonik Bandung Utara.",
    gradient: "from-amber-400 to-orange-600", ikon: "food" },
  { id: "d-3", nama: "Kawah Putih", kategori: "Wisata", stasiunId: "s-bd", rating: 4.7, ulasanCount: 312, verified: true,
    alamat: "Ciwidey, Bandung Selatan", lat: -7.1664, lng: 107.4019,
    deskripsi: "Danau kawah belerang dengan air berwarna putih kehijauan. Panorama vulkanik yang dramatis di lereng Gunung Patuha.",
    gradient: "from-cyan-300 to-emerald-500", ikon: "mountain" },
  { id: "d-4", nama: "Monas", kategori: "Wisata", stasiunId: "s-gmr", rating: 4.4, ulasanCount: 528, verified: true,
    alamat: "Gambir, Jakarta Pusat", lat: -6.1754, lng: 106.8272,
    deskripsi: "Monumen Nasional setinggi 132 meter, ikon kemerdekaan Indonesia. Lift menuju puncak menyajikan panorama Jakarta.",
    gradient: "from-stone-300 to-amber-500", ikon: "monument" },
  { id: "d-5", nama: "Soto Kudus Blok M", kategori: "Kuliner", stasiunId: "s-mri", rating: 4.5, ulasanCount: 67, verified: true,
    alamat: "Blok M, Jakarta Selatan", lat: -6.2436, lng: 106.7984,
    deskripsi: "Soto bening khas Kudus dengan suwiran ayam kampung. Sajian sederhana namun hangat dan otentik.",
    gradient: "from-yellow-300 to-amber-600", ikon: "food" },
  { id: "d-6", nama: "Batik Trusmi", kategori: "UMKM", stasiunId: "s-cn", rating: 4.5, ulasanCount: 54, verified: true,
    alamat: "Plered, Cirebon", lat: -6.7341, lng: 108.5089,
    deskripsi: "Sentra batik Cirebon dengan motif mega mendung dan paksinaga. Bisa melihat proses cap dan tulis langsung.",
    gradient: "from-blue-400 to-indigo-700", ikon: "craft" },
  { id: "d-7", nama: "Malioboro", kategori: "Wisata", stasiunId: "s-yk", rating: 4.6, ulasanCount: 891, verified: true,
    alamat: "Jl. Malioboro, Yogyakarta", lat: -7.7926, lng: 110.3658,
    deskripsi: "Jalan ikonik Yogya yang berdenyut sepanjang hari. Pedagang, andong, dan jajanan kaki lima berbaur jadi satu.",
    gradient: "from-orange-300 to-red-500", ikon: "street" },
  { id: "d-8", nama: "Gudeg Yu Djum", kategori: "Kuliner", stasiunId: "s-yk", rating: 4.7, ulasanCount: 234, verified: true,
    alamat: "Wijilan, Yogyakarta", lat: -7.8042, lng: 110.3676,
    deskripsi: "Gudeg manis legit dengan krecek pedas. Resep turun-temurun yang sudah jadi rujukan sejak puluhan tahun.",
    gradient: "from-amber-400 to-yellow-700", ikon: "food" },
  { id: "d-9", nama: "Keraton Yogyakarta", kategori: "Wisata", stasiunId: "s-yk", rating: 4.5, ulasanCount: 412, verified: true,
    alamat: "Kraton, Yogyakarta", lat: -7.8053, lng: 110.3641,
    deskripsi: "Istana Sultan Yogyakarta dengan arsitektur Jawa klasik. Museum dan pertunjukan budaya rutin di pelataran.",
    gradient: "from-stone-400 to-stone-700", ikon: "palace" },
  { id: "d-10", nama: "Tugu Pahlawan", kategori: "Wisata", stasiunId: "s-sgu", rating: 4.3, ulasanCount: 178, verified: true,
    alamat: "Bubutan, Surabaya", lat: -7.2459, lng: 112.7378,
    deskripsi: "Monumen perjuangan 10 November 1945. Museum di bawah tanah berisi diorama pertempuran Surabaya.",
    gradient: "from-stone-300 to-red-600", ikon: "monument" },
  { id: "d-11", nama: "Rawon Setan", kategori: "Kuliner", stasiunId: "s-sgu", rating: 4.6, ulasanCount: 156, verified: true,
    alamat: "Embong Malang, Surabaya", lat: -7.2620, lng: 112.7390,
    deskripsi: "Rawon hitam pekat dengan daging empuk dan tauge segar. Buka tengah malam — legenda kuliner Surabaya.",
    gradient: "from-stone-700 to-stone-900", ikon: "food" },
  { id: "d-12", nama: "Lawang Sewu", kategori: "Wisata", stasiunId: "s-smt", rating: 4.4, ulasanCount: 267, verified: true,
    alamat: "Sekayu, Semarang", lat: -6.9839, lng: 110.4109,
    deskripsi: "Bangunan kolonial Belanda dengan seribu pintu. Bekas kantor kereta api yang kini jadi museum heritage.",
    gradient: "from-amber-300 to-stone-700", ikon: "heritage" },
  { id: "d-13", nama: "Lumpia Semarang", kategori: "Kuliner", stasiunId: "s-smt", rating: 4.5, ulasanCount: 98, verified: true,
    alamat: "Pandanaran, Semarang", lat: -6.9908, lng: 110.4203,
    deskripsi: "Lumpia rebung dengan kulit tipis renyah dan isian gurih-manis. Salah satu oleh-oleh wajib dari Semarang.",
    gradient: "from-orange-300 to-amber-600", ikon: "food" },
  { id: "d-14", nama: "Batu Night Spectacular", kategori: "Wisata", stasiunId: "s-ml", rating: 4.2, ulasanCount: 421, verified: true,
    alamat: "Batu, Malang", lat: -7.8779, lng: 112.5276,
    deskripsi: "Taman hiburan malam dengan wahana keluarga dan pertunjukan air mancur menari. Dingin sepoi-sepoi khas Batu.",
    gradient: "from-purple-400 to-indigo-700", ikon: "park" },
  { id: "d-15", nama: "Bakso President", kategori: "Kuliner", stasiunId: "s-ml", rating: 4.6, ulasanCount: 184, verified: true,
    alamat: "Batang Hari, Malang", lat: -7.9764, lng: 112.6299,
    deskripsi: "Bakso urat kenyal di kuah kaldu sapi yang gurih. Posisinya tepat di samping rel — sensasi makan ditemani kereta lewat.",
    gradient: "from-red-400 to-rose-700", ikon: "food" },
  { id: "d-16", nama: "Pasar Triwindu", kategori: "UMKM", stasiunId: "s-slo", rating: 4.3, ulasanCount: 73, verified: true,
    alamat: "Diponegoro, Solo", lat: -7.5634, lng: 110.8260,
    deskripsi: "Pasar barang antik dan kerajinan tangan. Wayang kulit, keris, dan pernak-pernik vintage berderet di lapak.",
    gradient: "from-amber-300 to-orange-700", ikon: "craft" },
  { id: "d-17", nama: "Selat Solo Mbak Lies", kategori: "Kuliner", stasiunId: "s-slo", rating: 4.5, ulasanCount: 112, verified: true,
    alamat: "Serengan, Solo", lat: -7.5760, lng: 110.8260,
    deskripsi: "Selat — kuliner fusion Jawa-Eropa berupa steak lokal dengan saus encer manis-asam. Sentuhan kerajaan Mataram.",
    gradient: "from-yellow-300 to-amber-700", ikon: "food" },
  { id: "d-18", nama: "Mendoan Cirebon", kategori: "Kuliner", stasiunId: "s-cn", rating: 4.2, ulasanCount: 41, verified: false,
    alamat: "Kejaksan, Cirebon", lat: -6.7211, lng: 108.5634,
    deskripsi: "Tempe tipis lebar yang digoreng setengah matang. Disantap dengan cabai rawit dan kecap manis.",
    gradient: "from-amber-300 to-yellow-600", ikon: "food" },
  { id: "d-19", nama: "Empal Gentong", kategori: "Kuliner", stasiunId: "s-cn", rating: 4.4, ulasanCount: 88, verified: true,
    alamat: "Pekiringan, Cirebon", lat: -6.7290, lng: 108.5510,
    deskripsi: "Gulai daging sapi yang dimasak dalam gentong tanah liat. Aroma asapnya khas, kuahnya kental dan kaya rempah.",
    gradient: "from-orange-400 to-red-700", ikon: "food" },
  { id: "d-20", nama: "Toko Oen", kategori: "Kuliner", stasiunId: "s-mlk", rating: 4.5, ulasanCount: 192, verified: true,
    alamat: "Basuki Rahmat, Malang", lat: -7.9810, lng: 112.6342,
    deskripsi: "Kedai es krim & kue tradisional sejak 1930. Interior kolonial yang masih terjaga utuh hingga kini.",
    gradient: "from-pink-300 to-rose-600", ikon: "cafe" },
  { id: "d-21", nama: "Trans Studio Bandung", kategori: "Wisata", stasiunId: "s-cmi", rating: 4.4, ulasanCount: 612, verified: true,
    alamat: "Gatot Subroto, Bandung", lat: -6.9264, lng: 107.6362,
    deskripsi: "Theme park indoor dengan wahana sekelas dunia. Sirkuit roller coaster dan zona film yang imersif.",
    gradient: "from-pink-400 to-purple-700", ikon: "park" },
  { id: "d-22", nama: "Kerupuk Melarat", kategori: "UMKM", stasiunId: "s-cn", rating: 4.1, ulasanCount: 36, verified: true,
    alamat: "Plered, Cirebon", lat: -6.7298, lng: 108.5102,
    deskripsi: "Kerupuk warna-warni yang digoreng dengan pasir. Renyah dan ringan, oleh-oleh khas Cirebon yang nostalgis.",
    gradient: "from-yellow-300 to-pink-500", ikon: "craft" },
  { id: "d-23", nama: "Pendaftaran Pending", kategori: "UMKM", stasiunId: "s-yk", rating: 0, ulasanCount: 0, verified: false,
    alamat: "Sleman, Yogyakarta", lat: -7.7100, lng: 110.4000,
    deskripsi: "UMKM kerajinan perak yang baru mendaftar dan menunggu verifikasi tim moderator.",
    gradient: "from-stone-200 to-stone-500", ikon: "craft" },
  { id: "d-24", nama: "Sentra Batik Lasem", kategori: "UMKM", stasiunId: "s-smt", rating: 4.6, ulasanCount: 27, verified: false,
    alamat: "Lasem, Rembang", lat: -6.6957, lng: 111.4458,
    deskripsi: "Pusat batik tulis Lasem dengan motif Tionghoa-Jawa. Warna merah cabai dan biru tua khas pesisir utara.",
    gradient: "from-red-400 to-amber-700", ikon: "craft" },
];

const ULASAN = [
  { id: "u-1", destinasiId: "d-1", userId: "p-3", userName: "Rizki Pratama", rating: 5, judul: "Pertunjukan magis", konten: "Anak-anak senang sekali ikut workshop angklung. Pemandu sabar dan ceritanya lengkap.", tgl: "2026-05-12" },
  { id: "u-2", destinasiId: "d-1", userId: "p-4", userName: "Maya Saraswati", rating: 4, judul: "Wajib mampir", konten: "Kalau ke Bandung, jangan lewatkan. Cuma agak macet di akhir pekan, datang pagi lebih nyaman.", tgl: "2026-05-08" },
  { id: "u-3", destinasiId: "d-3", userId: "p-2", userName: "Dewi Lestari", rating: 5, judul: "Lanskap surreal", konten: "Air danau benar-benar putih kehijauan, kayak di planet lain. Bawa masker karena bau belerang cukup tajam.", tgl: "2026-05-15" },
  { id: "u-4", destinasiId: "d-7", userId: "p-3", userName: "Rizki Pratama", rating: 5, judul: "Jiwa Yogya", konten: "Pejalan kaki sekarang dimanjain trotoar lebar. Sore hari paling enak, lampu-lampu mulai nyala.", tgl: "2026-05-10" },
  { id: "u-5", destinasiId: "d-7", userId: "p-5", userName: "Bagus Wicaksono", rating: 4, judul: "Ramai tapi seru", konten: "Pas weekend memang padat. Tapi itulah esensi Malioboro — denyut kota yang tidak pernah tidur.", tgl: "2026-05-04" },
  { id: "u-6", destinasiId: "d-11", userId: "p-4", userName: "Maya Saraswati", rating: 5, judul: "Rawon terbaik", konten: "Daging empuk, kuah pekat, kerupuk udangnya juicy. Buka 24 jam jadi penyelamat lapar tengah malam.", tgl: "2026-05-14" },
];

const PENGGUNA = [
  { id: "p-1", nama: "Admin Jejak", email: "admin@jejakjalur.id", isAdmin: true, joined: "2025-08-10" },
  { id: "p-2", nama: "Dewi Lestari", email: "dewi.l@example.com", isAdmin: false, joined: "2026-01-22" },
  { id: "p-3", nama: "Rizki Pratama", email: "rizki.p@example.com", isAdmin: false, joined: "2026-02-15" },
  { id: "p-4", nama: "Maya Saraswati", email: "maya.s@example.com", isAdmin: false, joined: "2026-03-04" },
  { id: "p-5", nama: "Bagus Wicaksono", email: "bagus.w@example.com", isAdmin: false, joined: "2026-04-18" },
  { id: "p-6", nama: "Sinta Hapsari", email: "sinta.h@example.com", isAdmin: false, joined: "2026-04-29" },
];

// helpers
function destinasiCountByStasiun(stasiunId) {
  return DESTINASI.filter(d => d.stasiunId === stasiunId).length;
}
function destinasiCountByKota(kotaId) {
  const sIds = STASIUN.filter(s => s.kotaId === kotaId).map(s => s.id);
  return DESTINASI.filter(d => sIds.includes(d.stasiunId)).length;
}
function stasiunCountByKota(kotaId) {
  return STASIUN.filter(s => s.kotaId === kotaId).length;
}
function getStasiun(id) { return STASIUN.find(s => s.id === id); }
function getKota(id) { return KOTA.find(k => k.id === id); }
function getKotaByStasiun(sId) {
  const s = getStasiun(sId); return s ? getKota(s.kotaId) : null;
}

// BFS for route planning
function cariRute(dariId, keId) {
  if (dariId === keId) return null;
  const graph = {};
  KONEKSI.forEach(([a, b]) => {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b); graph[b].push(a);
  });
  const visited = new Set([dariId]);
  const queue = [[dariId]];
  while (queue.length) {
    const path = queue.shift();
    const last = path[path.length - 1];
    if (last === keId) return path.map(getStasiun);
    for (const nb of (graph[last] || [])) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push([...path, nb]);
      }
    }
  }
  return null;
}

Object.assign(window, {
  KOTA, STASIUN, DESTINASI, ULASAN, PENGGUNA, KONEKSI,
  destinasiCountByStasiun, destinasiCountByKota, stasiunCountByKota,
  getStasiun, getKota, getKotaByStasiun, cariRute,
});
