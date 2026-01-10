import { Layout } from "@/components/layout/Layout";
import { PengumumanCard } from "@/components/cards/PengumumanCard";
import { pengumumanData } from "@/data/dummyData";

export default function Pengumuman() {
  return (
    <Layout>
      {/* Header */}
      <section className="border-b-2 border-foreground bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold md:text-4xl">Pengumuman</h1>
          <p className="mt-2 text-muted-foreground">
            Pengumuman dan informasi penting dari Pemerintah Desa Bugel
          </p>
        </div>
      </section>

      {/* Daftar Pengumuman */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-4">
            {pengumumanData.map((pengumuman) => (
              <PengumumanCard key={pengumuman.id} pengumuman={pengumuman} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
