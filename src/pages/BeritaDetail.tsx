import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { beritaData } from "@/data/dummyData";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BeritaDetail() {
  const { id } = useParams();
  const berita = beritaData.find((b) => b.id === id);

  if (!berita) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold">Berita tidak ditemukan</h1>
          <Link to="/berita">
            <Button variant="outline">Kembali ke Berita</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(berita.tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Layout>
      {/* Header */}
      <section className="border-b-2 border-foreground bg-secondary py-8">
        <div className="container mx-auto px-4">
          <Link
            to="/berita"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Berita
          </Link>
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">{berita.judul}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={berita.tanggal}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{berita.penulis}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gambar */}
      <section className="border-b-2 border-foreground">
        <img
          src={berita.gambar}
          alt={berita.judul}
          className="h-64 w-full object-cover md:h-96"
        />
      </section>

      {/* Konten */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {berita.konten.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
