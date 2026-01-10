import { Layout } from "@/components/layout/Layout";
import { AgendaCard } from "@/components/cards/AgendaCard";
import { agendaData } from "@/data/dummyData";

export default function Agenda() {
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
          <div className="mx-auto max-w-3xl space-y-4">
            {agendaData.map((agenda) => (
              <AgendaCard key={agenda.id} agenda={agenda} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
