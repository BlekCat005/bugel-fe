import { Calendar, AlertCircle, Info, Bell } from "lucide-react";
import { Pengumuman } from "@/data/dummyData";

interface PengumumanCardProps {
  pengumuman: Pengumuman;
}

export function PengumumanCard({ pengumuman }: PengumumanCardProps) {
  const formattedDate = new Date(pengumuman.tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const priorityConfig = {
    tinggi: {
      icon: AlertCircle,
      label: "Penting",
      className: "bg-destructive text-destructive-foreground",
    },
    sedang: {
      icon: Bell,
      label: "Info",
      className: "bg-primary text-primary-foreground",
    },
    rendah: {
      icon: Info,
      label: "Umum",
      className: "bg-muted text-muted-foreground",
    },
  };

  const priority = priorityConfig[pengumuman.prioritas];
  const PriorityIcon = priority.icon;

  return (
    <article className="border-2 border-foreground bg-card p-4 transition-all hover:shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className={`flex items-center gap-1 px-2 py-1 text-xs font-medium ${priority.className}`}>
          <PriorityIcon className="h-3 w-3" />
          {priority.label}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={pengumuman.tanggal}>{formattedDate}</time>
        </div>
      </div>
      <h3 className="mb-2 font-bold">{pengumuman.judul}</h3>
      <p className="text-sm text-muted-foreground">{pengumuman.konten}</p>
    </article>
  );
}
