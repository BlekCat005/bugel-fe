import heroVillage from "@/assets/hero-village.jpg";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

export interface Berita {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  gambar: string;
  tanggal: string;
  penulis: string;
}

export interface Agenda {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
}

export interface Pengumuman {
  id: string;
  judul: string;
  konten: string;
  tanggal: string;
  prioritas: "tinggi" | "sedang" | "rendah";
}

export interface GaleriFoto {
  id: string;
  judul: string;
  gambar: string;
  deskripsi: string;
  tanggal: string;
}

export const profilDesa = {
  nama: "Desa Bugel",
  kecamatan: "Ciawi",
  kabupaten: "Tasikmalaya",
  provinsi: "Jawa Barat",
  kodePos: "46156",
  luasWilayah: "911.815 Ha",
  jumlahPenduduk: "6.326 Jiwa",
  jumlahKK: "2.238 KK",
  kepalaDesa: "Ruhimat",
  alamatKantor: "R48H+HPH, Bugel, Kec. Ciawi, Kabupaten Tasikmalaya, Jawa Barat 46156",
  telepon: "+62 857-9351-1482",
  email: "desa.bugel@gmail.com",
  deskripsi: `Desa Bugel merupakan salah satu desa yang terletak di Kecamatan Ciawi, Kabupaten Tasikmalaya, Provinsi Jawa Barat. Desa ini memiliki potensi alam yang indah dengan hamparan sawah serta lingkungan pegunungan yang masih asri.

Mayoritas penduduk Desa Bugel bermata pencaharian sebagai petani, dengan hasil utama berupa padi dan berbagai tanaman pertanian lainnya. Selain itu, sebagian masyarakat juga menggantungkan penghasilan dari kegiatan penjualan produk olahan lokal, seperti kecimpring, opak, dan gula aren, yang menjadi ciri khas sekaligus potensi ekonomi desa.

Desa Bugel juga memiliki tradisi gotong royong yang masih sangat kuat. Hal ini tercermin dalam berbagai kegiatan kemasyarakatan, seperti kerja bakti, pengajian rutin, serta perayaan hari besar nasional maupun keagamaan.`,
  visi: "Mewujudkan Desa yang berkeadilan ,Religius,mandiri dan berbudaya",
  misi: [
    "Meningkatkan produktivitas ekonomi masyarakat melalui program program pemerintah sesuai pengetahuan dan keterampilan masyarakat Desa Bugel",
    "Mengembangkan potensi masyarakat Desa Bugel melalui pelatihan keterampilan  Khusus Demi menekan angka pengangguran",
    "Meningkatkan Peran aktif Perempuan,Meningkatkan Kwalitas Sumber Daya Manusia dan Meningkatkan Pelayanan Kebutuhan Masyarakat  di Desa Bugel",
    "Meningkatkan kualitas pendidikan dan kesehatan masyarakat",
    "Mendukung segala kegiatan   keagamaan",
    "Menumbuhkan Semangat gotong royong dan Swadaya Masyarakat Desa Bugel",
    "Merawat Kearipan lokal  masyarakat Desa Bugel",
    "Membangun Infrastruktur di Desa Bugel"
  ],
  heroImage: heroVillage
};

// Fallback data untuk dipakai ketika API tidak bisa diakses
export const beritaData: Berita[] = [
  {
    id: "1",
    judul: "Pembangunan Jalan Desa Dimulai",
    ringkasan: "Pemerintah desa memulai pembangunan jalan penghubung antar dusun.",
    konten:
      "Pembangunan jalan desa sepanjang 2 km dimulai pekan ini untuk meningkatkan akses warga ke pusat desa.",
    gambar: news1,
    tanggal: "2024-11-01",
    penulis: "Admin Desa",
  },
  {
    id: "2",
    judul: "Gotong Royong Bersih Sungai",
    ringkasan: "Warga bergotong royong membersihkan aliran sungai utama desa.",
    konten:
      "Kegiatan bersih-bersih sungai dilakukan agar aliran air lebih lancar dan mencegah banjir saat musim hujan.",
    gambar: news2,
    tanggal: "2024-10-18",
    penulis: "Admin Desa",
  },
  {
    id: "3",
    judul: "Pelatihan UMKM Produk Lokal",
    ringkasan: "Pelatihan peningkatan kualitas produk lokal diadakan di balai desa.",
    konten:
      "Pelatihan ini menghadirkan narasumber dari dinas koperasi untuk membantu UMKM meningkatkan pemasaran digital.",
    gambar: news3,
    tanggal: "2024-09-30",
    penulis: "Admin Desa",
  },
];

export const agendaData: Agenda[] = [
  {
    id: "1",
    judul: "Rapat Koordinasi Bulanan",
    deskripsi: "Evaluasi program desa bulan berjalan dan rencana kerja bulan berikutnya.",
    tanggal: "2024-11-05",
    waktu: "09:00",
    lokasi: "Balai Desa",
  },
  {
    id: "2",
    judul: "Posyandu Balita",
    deskripsi: "Pemeriksaan rutin kesehatan balita dan penyuluhan gizi.",
    tanggal: "2024-11-08",
    waktu: "08:00",
    lokasi: "Posyandu Melati",
  },
  {
    id: "3",
    judul: "Kerja Bakti Kebersihan",
    deskripsi: "Membersihkan area lapang dan selokan menjelang musim hujan.",
    tanggal: "2024-11-12",
    waktu: "07:00",
    lokasi: "Lapangan Desa",
  },
];

export const pengumumanData: Pengumuman[] = [
  {
    id: "1",
    judul: "Layanan Administrasi Tutup Sementara",
    konten: "Layanan administrasi desa tutup pada 10 November 2024 untuk pembaruan sistem.",
    tanggal: "2024-10-25",
    prioritas: "sedang",
  },
  {
    id: "2",
    judul: "Pembagian Pupuk Bersubsidi",
    konten: "Petani diminta mendaftar ulang untuk mendapatkan kuota pupuk bersubsidi tahap akhir 2024.",
    tanggal: "2024-10-28",
    prioritas: "tinggi",
  },
  {
    id: "3",
    judul: "Penyaluran BLT Dana Desa",
    konten: "Penyaluran BLT bulan November dijadwalkan tanggal 15 November 2024 di balai desa.",
    tanggal: "2024-11-01",
    prioritas: "tinggi",
  },
];