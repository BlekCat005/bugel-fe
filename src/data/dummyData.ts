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