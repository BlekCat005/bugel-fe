import { Calendar, Clock, MapPin } from "lucide-react";
import { Agenda } from "@/data/dummyData";

interface AgendaCardProps {
  agenda: Agenda;
}

export function AgendaCard({ agenda }: AgendaCardProps) {
  const date = new Date(agenda.tanggal);
  const day = date.getDate();
  const month = date.toLocaleDateString("id-ID", { month: "short" });

  return (
    <article className="flex gap-4 border-2 border-foreground bg-card p-4 transition-all hover:shadow-sm">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center border-2 border-foreground bg-primary text-primary-foreground">
        <span className="text-2xl font-bold leading-none">{day}</span>
        <span className="text-xs uppercase">{month}</span>
      </div>
      <div className="flex-1">
        <h3 className="mb-2 font-bold">{agenda.judul}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {agenda.deskripsi}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{agenda.waktu}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{agenda.lokasi}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
