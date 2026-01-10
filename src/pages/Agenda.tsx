import { Layout } from "@/components/layout/Layout";
import { AgendaCard } from "@/components/cards/AgendaCard";
import { useQuery } from "@tanstack/react-query";
import { getAgenda } from "@/lib/api";

export default function Agenda() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["agenda"], queryFn: getAgenda });
  const agendaList = data || [];

  return (
    <Layout>
      {/* Header */}
      <section className="border-b-2 border-foreground bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold md:text-4xl">Agenda Kegiatan</h1>
          <p className="mt-2 text-muted-foreground">
            Jadwal kegiatan dan acara yang akan datang di Desa Bugel
          </p>
        </div>
      </section>

      {/* Daftar Agenda */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading && <p className="text-muted-foreground">Memuat agenda...</p>}
          {isError && <p className="text-destructive">Agenda gagal dimuat.</p>}
          {!isLoading && !isError && agendaList.length === 0 && (
            <p className="text-muted-foreground">Belum ada agenda.</p>
          )}
          <div className="mx-auto max-w-3xl space-y-4">
            {agendaList.map((agenda) => (
              <AgendaCard key={agenda.id} agenda={agenda} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
