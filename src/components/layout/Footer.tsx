import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { profilDesa } from "@/data/dummyData";

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Tentang Desa */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-primary-foreground bg-primary-foreground font-mono text-lg font-bold text-primary">
                DB
              </div>
              <div>
                <p className="font-bold">Desa Bugel</p>
                <p className="text-xs opacity-80">Kec. Ciawi, Tasikmalaya</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Portal resmi Desa Bugel. Menyediakan informasi dan layanan untuk warga desa.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-4 border-b-2 border-primary-foreground pb-2 font-bold">
              Kontak
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="opacity-80">{profilDesa.alamatKantor}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span className="opacity-80">{profilDesa.telepon}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="opacity-80">{profilDesa.email}</span>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h3 className="mb-4 border-b-2 border-primary-foreground pb-2 font-bold">
              Jam Operasional
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span className="opacity-80">Senin - Sabtu: 08:00 - 14:00</span>
              </li>
              
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span className="opacity-80">Minggu: Tutup</span>
              </li>
            </ul>
          </div>

          {/* Link Cepat */}
          <div>
            <h3 className="mb-4 border-b-2 border-primary-foreground pb-2 font-bold">
              Link Cepat
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/profil" className="opacity-80 transition-opacity hover:opacity-100">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link to="/berita" className="opacity-80 transition-opacity hover:opacity-100">
                  Berita Terbaru
                </Link>
              </li>
              <li>
                <Link to="/agenda" className="opacity-80 transition-opacity hover:opacity-100">
                  Agenda Kegiatan
                </Link>
              </li>
              <li>
                <Link to="/pengumuman" className="opacity-80 transition-opacity hover:opacity-100">
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="opacity-80 transition-opacity hover:opacity-100">
                  Galeri Foto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t-2 border-primary-foreground pt-8 text-center text-sm opacity-80">
          <p>© 2025 Desa Bugel, Kecamatan Ciawi, Kabupaten Tasikmalaya. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
