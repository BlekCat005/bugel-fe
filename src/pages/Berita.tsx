import { Layout } from "@/components/layout/Layout";
import { BeritaCard } from "@/components/cards/BeritaCard";
import { useQuery } from "@tanstack/react-query";
import { getBerita } from "@/lib/api";

export default function Berita() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["berita"], queryFn: getBerita });
  const beritaList = data || [];

  return (
    <Layout>
      {/* Header */}
      <section className="border-b-2 border-foreground bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold md:text-4xl">Berita Desa</h1>
          <p className="mt-2 text-muted-foreground">
            Informasi dan berita terbaru dari Desa Bugel
          </p>
        </div>
      </section>

      {/* Daftar Berita */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading && <p className="text-muted-foreground">Memuat berita...</p>}
          {isError && <p className="text-destructive">Berita gagal dimuat.</p>}
          {!isLoading && !isError && beritaList.length === 0 && (
            <p className="text-muted-foreground">Belum ada berita.</p>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beritaList.map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
