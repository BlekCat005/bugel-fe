import { Link } from "react-router-dom";
import { ArrowRight, Users, MapPin, Home as HomeIcon, Newspaper, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { BeritaCard } from "@/components/cards/BeritaCard";
import { AgendaCard } from "@/components/cards/AgendaCard";
import { PengumumanCard } from "@/components/cards/PengumumanCard";
import { profilDesa } from "@/data/dummyData";
import { useQuery } from "@tanstack/react-query";
import { getAgenda, getBerita, getPengumuman } from "@/lib/api";

const Index = () => {
  const {
    data: beritaData,
    isLoading: beritaLoading,
    isError: beritaError,
  } = useQuery({ queryKey: ["berita"], queryFn: getBerita });

  const {
    data: agendaData,
    isLoading: agendaLoading,
    isError: agendaError,
  } = useQuery({ queryKey: ["agenda"], queryFn: getAgenda });

  const {
    data: pengumumanData,
    isLoading: pengumumanLoading,
    isError: pengumumanError,
  } = useQuery({ queryKey: ["pengumuman"], queryFn: getPengumuman });

  const beritaList = beritaData || [];
  const agendaList = agendaData || [];
  const pengumumanList = pengumumanData || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative border-b-2 border-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${profilDesa.heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="mb-4 inline-block border-2 border-foreground bg-background px-3 py-1 text-sm font-medium">
              Portal Resmi
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Selamat Datang di <span className="underline decoration-4 underline-offset-4">Desa Bugel</span>
            </h1>
            <p className="mb-6 text-lg text-muted-foreground md:text-xl">
              Kecamatan Ciawi, Kabupaten Tasikmalaya, Jawa Barat
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/profil">
                <Button size="lg" className="gap-2">
                  Profil Desa
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/kontak">
                <Button variant="outline" size="lg">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik Desa */}
      <section className="border-b-2 border-foreground bg-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="border-2 border-foreground bg-background p-4 text-center">
              <Users className="mx-auto mb-2 h-8 w-8" />
              <p className="text-2xl font-bold">{profilDesa.jumlahPenduduk}</p>
              <p className="text-sm text-muted-foreground">Penduduk</p>
            </div>
            <div className="border-2 border-foreground bg-background p-4 text-center">
              <HomeIcon className="mx-auto mb-2 h-8 w-8" />
              <p className="text-2xl font-bold">{profilDesa.jumlahKK}</p>
              <p className="text-sm text-muted-foreground">Kepala Keluarga</p>
            </div>
            <div className="border-2 border-foreground bg-background p-4 text-center">
              <MapPin className="mx-auto mb-2 h-8 w-8" />
              <p className="text-2xl font-bold">{profilDesa.luasWilayah}</p>
              <p className="text-sm text-muted-foreground">Luas Wilayah</p>
            </div>
            <div className="border-2 border-foreground bg-background p-4 text-center">
              <Users className="mx-auto mb-2 h-8 w-8" />
              <p className="text-lg font-bold">{profilDesa.kepalaDesa}</p>
              <p className="text-sm text-muted-foreground">Kepala Desa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="border-b-2 border-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-primary">
                <Newspaper className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Berita Terbaru</h2>
            </div>
            <Link
              to="/berita"
              className="flex items-center gap-1 text-sm font-medium underline underline-offset-4"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {beritaLoading && <p className="text-muted-foreground">Memuat berita...</p>}
          {beritaError && <p className="text-destructive">Berita gagal dimuat.</p>}
          {!beritaLoading && !beritaError && beritaList.length === 0 && (
            <p className="text-muted-foreground">Belum ada berita.</p>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beritaList.slice(0, 3).map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        </div>
      </section>

      {/* Agenda & Pengumuman */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Agenda */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-primary">
                    <Calendar className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold">Agenda Kegiatan</h2>
                </div>
                <Link
                  to="/agenda"
                  className="flex items-center gap-1 text-sm font-medium underline underline-offset-4"
                >
                  Semua
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {agendaLoading && <p className="text-muted-foreground">Memuat agenda...</p>}
                {agendaError && <p className="text-destructive">Agenda gagal dimuat.</p>}
                {!agendaLoading && !agendaError && agendaList.length === 0 && (
                  <p className="text-muted-foreground">Belum ada agenda.</p>
                )}
                {agendaList.slice(0, 2).map((agenda) => (
                  <AgendaCard key={agenda.id} agenda={agenda} />
                ))}
              </div>
            </div>

            {/* Pengumuman */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-primary">
                    <Bell className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold">Pengumuman</h2>
                </div>
                <Link
                  to="/pengumuman"
                  className="flex items-center gap-1 text-sm font-medium underline underline-offset-4"
                >
                  Semua
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {pengumumanLoading && <p className="text-muted-foreground">Memuat pengumuman...</p>}
                {pengumumanError && <p className="text-destructive">Pengumuman gagal dimuat.</p>}
                {!pengumumanLoading && !pengumumanError && pengumumanList.length === 0 && (
                  <p className="text-muted-foreground">Belum ada pengumuman.</p>
                )}
                {pengumumanList.slice(0, 2).map((pengumuman) => (
                  <PengumumanCard key={pengumuman.id} pengumuman={pengumuman} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
