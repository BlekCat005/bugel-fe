import { Layout } from "@/components/layout/Layout";
import { profilDesa } from "@/data/dummyData";
import { MapPin, Phone, Mail, Users, Home as HomeIcon, Target, Eye } from "lucide-react";

export default function ProfilDesa() {
  return (
    <Layout>
      {/* Header */}
      <section className="border-b-2 border-foreground bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold md:text-4xl">Profil Desa Bugel</h1>
          <p className="mt-2 text-muted-foreground">
            Kecamatan Ciawi, Kabupaten Tasikmalaya, Jawa Barat
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="border-b-2 border-foreground">
        <img
          src={profilDesa.heroImage}
          alt="Pemandangan Desa Bugel"
          className="h-64 w-full object-cover md:h-96"
        />
      </section>

      {/* Tentang Desa */}
      <section className="border-b-2 border-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-2xl font-bold">Tentang Desa</h2>
              <div className="prose prose-lg max-w-none">
                {profilDesa.deskripsi.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <div className="border-2 border-foreground bg-card p-6">
                <h3 className="mb-4 font-bold">Informasi Desa</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Kepala Desa</p>
                      <p className="text-muted-foreground">{profilDesa.kepalaDesa}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HomeIcon className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Jumlah Penduduk</p>
                      <p className="text-muted-foreground">{profilDesa.jumlahPenduduk} / {profilDesa.jumlahKK}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Luas Wilayah</p>
                      <p className="text-muted-foreground">{profilDesa.luasWilayah}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Telepon</p>
                      <p className="text-muted-foreground">{profilDesa.telepon}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{profilDesa.email}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Visi */}
            <div className="border-2 border-foreground bg-primary p-6 text-primary-foreground">
              <div className="mb-4 flex items-center gap-3">
                <Eye className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Visi</h2>
              </div>
              <p className="text-lg">{profilDesa.visi}</p>
            </div>

            {/* Misi */}
            <div className="border-2 border-foreground bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <Target className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Misi</h2>
              </div>
              <ol className="space-y-3">
                {profilDesa.misi.map((misi, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-foreground bg-secondary text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{misi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
