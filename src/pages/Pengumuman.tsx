import { Layout } from "@/components/layout/Layout";
import { PengumumanCard } from "@/components/cards/PengumumanCard";
import { useQuery } from "@tanstack/react-query";
import { getPengumuman } from "@/lib/api";

export default function Pengumuman() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["pengumuman"], queryFn: getPengumuman });
  const pengumumanList = data || [];

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
          {isLoading && <p className="text-muted-foreground">Memuat pengumuman...</p>}
          {isError && <p className="text-destructive">Pengumuman gagal dimuat.</p>}
          {!isLoading && !isError && pengumumanList.length === 0 && (
            <p className="text-muted-foreground">Belum ada pengumuman.</p>
          )}
          <div className="mx-auto max-w-3xl space-y-4">
            {pengumumanList.map((pengumuman) => (
              <PengumumanCard key={pengumuman.id} pengumuman={pengumuman} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
