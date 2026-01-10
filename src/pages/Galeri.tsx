import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { galeriData } from "@/data/dummyData";
import { X } from "lucide-react";

export default function Galeri() {
  const [selectedImage, setSelectedImage] = useState<typeof galeriData[0] | null>(null);

  return (
    <Layout>
      {/* Header */}
      <section className="border-b-2 border-foreground bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold md:text-4xl">Galeri Foto</h1>
          <p className="mt-2 text-muted-foreground">
            Dokumentasi kegiatan dan suasana Desa Bugel
          </p>
        </div>
      </section>

      {/* Grid Galeri */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galeriData.map((foto) => (
              <button
                key={foto.id}
                onClick={() => setSelectedImage(foto)}
                className="group border-2 border-foreground bg-card transition-all hover:shadow-md"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={foto.gambar}
                    alt={foto.judul}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-left">
                  <h3 className="font-bold">{foto.judul}</h3>
                  <p className="text-sm text-muted-foreground">{foto.deskripsi}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 border-2 border-foreground bg-background p-2"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-h-full max-w-4xl border-2 border-foreground bg-card">
            <img
              src={selectedImage.gambar}
              alt={selectedImage.judul}
              className="max-h-[70vh] w-full object-contain"
            />
            <div className="border-t-2 border-foreground p-4">
              <h3 className="font-bold">{selectedImage.judul}</h3>
              <p className="text-sm text-muted-foreground">{selectedImage.deskripsi}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
