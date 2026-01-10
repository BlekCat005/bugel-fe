import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { profilDesa } from "@/data/dummyData";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi pengiriman pesan
    toast.success("Pesan Anda telah terkirim! Kami akan segera merespons.");
    setFormData({ nama: "", email: "", subjek: "", pesan: "" });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="border-b-2 border-foreground bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold md:text-4xl">Kontak Desa</h1>
          <p className="mt-2 text-muted-foreground">
            Hubungi kami untuk informasi lebih lanjut
          </p>
        </div>
      </section>

      {/* Kontak Info & Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Informasi Kontak */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 border-2 border-foreground bg-card p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground bg-primary">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">Alamat</h3>
                    <p className="text-muted-foreground">{profilDesa.alamatKantor}</p>
                    <p className="text-sm text-muted-foreground">Kode Pos: {profilDesa.kodePos}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-2 border-foreground bg-card p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground bg-primary">
                    <Phone className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">Telepon</h3>
                    <p className="text-muted-foreground">{profilDesa.telepon}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-2 border-foreground bg-card p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground bg-primary">
                    <Mail className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-muted-foreground">{profilDesa.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-2 border-foreground bg-card p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground bg-primary">
                    <Clock className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">Jam Operasional</h3>
                    <p className="text-muted-foreground">Senin - Kamis: 08:00 - 15:00</p>
                    <p className="text-muted-foreground">Jumat: 08:00 - 11:00</p>
                    <p className="text-muted-foreground">Sabtu - Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Kontak */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="border-2 border-foreground bg-card p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input
                      id="nama"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subjek">Subjek</Label>
                    <Input
                      id="subjek"
                      value={formData.subjek}
                      onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pesan">Pesan</Label>
                    <Textarea
                      id="pesan"
                      rows={5}
                      value={formData.pesan}
                      onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Kirim Pesan
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
