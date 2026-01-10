import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Berita } from "@/data/dummyData";

interface BeritaCardProps {
  berita: Berita;
}

export function BeritaCard({ berita }: BeritaCardProps) {
  const formattedDate = new Date(berita.tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group border-2 border-foreground bg-card transition-all hover:shadow-md">
      <div className="aspect-video overflow-hidden border-b-2 border-foreground">
        <img
          src={berita.gambar}
          alt={berita.judul}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={berita.tanggal}>{formattedDate}</time>
        </div>
        <h3 className="mb-2 font-bold leading-tight">{berita.judul}</h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {berita.ringkasan}
        </p>
        <Link
          to={`/berita/${berita.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-muted-foreground"
        >
          Baca Selengkapnya
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
