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
  luasWilayah: "485 Ha",
  jumlahPenduduk: "4.250 Jiwa",
  jumlahKK: "1.120 KK",
  kepalaDesa: "H. Ahmad Supriatna",
  alamatKantor: "Jl. Raya Bugel No. 01, Desa Bugel, Kec. Ciawi, Kab. Tasikmalaya",
  telepon: "(0265) 123456",
  email: "desa.bugel@gmail.com",
  deskripsi: `Desa Bugel merupakan salah satu desa yang terletak di Kecamatan Ciawi, Kabupaten Tasikmalaya, Provinsi Jawa Barat. Desa ini memiliki potensi alam yang indah dengan hamparan sawah dan pegunungan yang asri.

Mayoritas penduduk Desa Bugel bermata pencaharian sebagai petani, dengan komoditas utama padi, sayuran, dan palawija. Selain pertanian, masyarakat juga aktif dalam kegiatan kerajinan tangan dan usaha kecil menengah.

Desa Bugel memiliki tradisi gotong royong yang masih sangat kuat, tercermin dalam berbagai kegiatan kemasyarakatan seperti kerja bakti, pengajian rutin, dan perayaan hari besar nasional maupun keagamaan.`,
  visi: "Terwujudnya Desa Bugel yang Maju, Mandiri, dan Sejahtera Berdasarkan Nilai-Nilai Keagamaan dan Kearifan Lokal",
  misi: [
    "Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel",
    "Mengembangkan potensi ekonomi masyarakat melalui pemberdayaan UMKM dan pertanian",
    "Membangun infrastruktur desa yang berkualitas dan merata",
    "Meningkatkan kualitas pendidikan dan kesehatan masyarakat",
    "Melestarikan budaya dan kearifan lokal desa"
  ],
  heroImage: heroVillage
};

export const beritaData: Berita[] = [
  {
    id: "1",
    judul: "Musyawarah Desa Bahas Rencana Pembangunan Tahun 2025",
    ringkasan: "Pemerintah Desa Bugel menggelar musyawarah desa untuk membahas prioritas pembangunan tahun anggaran 2025.",
    konten: `Pada hari Senin, 6 Januari 2025, Pemerintah Desa Bugel menggelar Musyawarah Desa (Musdes) yang dihadiri oleh seluruh perangkat desa, BPD, tokoh masyarakat, dan perwakilan warga dari setiap dusun.

Musyawarah ini membahas berbagai program prioritas pembangunan untuk tahun anggaran 2025, termasuk:
- Pembangunan jalan desa sepanjang 2 km
- Rehabilitasi gedung PAUD
- Pengadaan alat pertanian untuk kelompok tani
- Program bantuan sosial untuk warga kurang mampu

Kepala Desa H. Ahmad Supriatna menyampaikan bahwa partisipasi aktif warga sangat diharapkan dalam setiap tahap pembangunan desa.`,
    gambar: news1,
    tanggal: "2025-01-06",
    penulis: "Admin Desa"
  },
  {
    id: "2",
    judul: "Proyek Perbaikan Jalan Dusun Cibunar Dimulai",
    ringkasan: "Pemerintah desa memulai proyek perbaikan jalan sepanjang 1,5 km di Dusun Cibunar menggunakan dana desa.",
    konten: `Proyek perbaikan jalan desa di Dusun Cibunar resmi dimulai pada tanggal 3 Januari 2025. Proyek ini menggunakan anggaran Dana Desa tahun 2025 dengan total nilai Rp 150 juta.

Perbaikan jalan sepanjang 1,5 km ini sangat dinanti oleh warga karena kondisi jalan yang sebelumnya rusak parah, terutama saat musim hujan.

Kepala Dusun Cibunar, Bapak Ujang Suryana, menyampaikan apresiasi kepada pemerintah desa atas perhatiannya terhadap infrastruktur dusun.

Proyek diperkirakan akan selesai dalam waktu 2 bulan ke depan dengan melibatkan tenaga kerja lokal dari warga setempat.`,
    gambar: news2,
    tanggal: "2025-01-03",
    penulis: "Admin Desa"
  },
  {
    id: "3",
    judul: "Posyandu Lansia Rutin Diadakan Setiap Minggu Pertama",
    ringkasan: "Desa Bugel secara rutin mengadakan posyandu lansia untuk memantau kesehatan warga usia lanjut.",
    konten: `Program Posyandu Lansia di Desa Bugel terus berjalan secara rutin setiap minggu pertama setiap bulan. Kegiatan ini dilaksanakan di Balai Desa dan diikuti oleh sekitar 80 warga lansia.

Kegiatan posyandu meliputi:
- Pemeriksaan tekanan darah
- Pemeriksaan gula darah
- Konsultasi kesehatan
- Senam lansia
- Pemberian makanan tambahan

Kegiatan ini bekerja sama dengan Puskesmas Ciawi dan dibantu oleh kader-kader posyandu yang sudah terlatih.

"Kesehatan lansia adalah prioritas kami. Dengan posyandu rutin, kami bisa memantau kesehatan mereka secara berkala," ujar Bidan Desa.`,
    gambar: news3,
    tanggal: "2025-01-05",
    penulis: "Admin Desa"
  }
];

export const agendaData: Agenda[] = [
  {
    id: "1",
    judul: "Kerja Bakti Bersih Desa",
    deskripsi: "Kegiatan gotong royong membersihkan lingkungan desa dalam rangka menyambut HUT RI. Seluruh warga diharapkan berpartisipasi.",
    tanggal: "2025-01-15",
    waktu: "07:00 - 11:00 WIB",
    lokasi: "Seluruh Dusun di Desa Bugel"
  },
  {
    id: "2",
    judul: "Rapat Koordinasi Perangkat Desa",
    deskripsi: "Rapat koordinasi bulanan seluruh perangkat desa untuk evaluasi program kerja dan perencanaan kegiatan bulan depan.",
    tanggal: "2025-01-20",
    waktu: "09:00 - 12:00 WIB",
    lokasi: "Balai Desa Bugel"
  }
];

export const pengumumanData: Pengumuman[] = [
  {
    id: "1",
    judul: "Pendaftaran Bantuan Sosial Tahun 2025",
    konten: "Bagi warga yang belum terdaftar sebagai penerima bantuan sosial dan memenuhi kriteria, dapat mendaftarkan diri ke kantor desa dengan membawa KTP, KK, dan surat keterangan tidak mampu dari RT/RW. Pendaftaran dibuka mulai tanggal 10-20 Januari 2025.",
    tanggal: "2025-01-08",
    prioritas: "tinggi"
  },
  {
    id: "2",
    judul: "Jadwal Pelayanan Administrasi Selama Libur Nasional",
    konten: "Diberitahukan kepada seluruh warga bahwa pelayanan administrasi desa akan tetap buka selama libur nasional dengan jam operasional terbatas (08:00 - 12:00 WIB). Untuk keperluan mendesak, dapat menghubungi nomor darurat desa.",
    tanggal: "2025-01-07",
    prioritas: "sedang"
  }
];

export const galeriData: GaleriFoto[] = [
  {
    id: "1",
    judul: "Musyawarah Desa 2025",
    gambar: news1,
    deskripsi: "Suasana musyawarah desa membahas program pembangunan",
    tanggal: "2025-01-06"
  },
  {
    id: "2",
    judul: "Pembangunan Jalan Desa",
    gambar: news2,
    deskripsi: "Proses perbaikan jalan di Dusun Cibunar",
    tanggal: "2025-01-03"
  },
  {
    id: "3",
    judul: "Posyandu Lansia",
    gambar: news3,
    deskripsi: "Kegiatan posyandu lansia rutin bulanan",
    tanggal: "2025-01-05"
  },
  {
    id: "4",
    judul: "Pemandangan Desa Bugel",
    gambar: heroVillage,
    deskripsi: "Panorama indah persawahan Desa Bugel",
    tanggal: "2025-01-01"
  }
];
