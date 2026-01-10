import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  Bell,
  Image,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Menu,
  X,
  Home,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  beritaData as initialBerita,
  agendaData as initialAgenda,
  pengumumanData as initialPengumuman,
  Berita,
  Agenda,
  Pengumuman,
  GaleriFoto,
} from "@/data/dummyData";
import {
  getBerita,
  createBerita,
  updateBerita,
  deleteBerita,
  getAgenda,
  createAgenda,
  updateAgenda,
  deleteAgenda,
  getPengumuman,
  createPengumuman,
  updatePengumuman,
  deletePengumuman,
  getGaleri,
  createGaleri,
  updateGaleri,
  deleteGaleri,
  type CreateGaleriPayload,
} from "@/lib/api";

type TabType = "dashboard" | "berita" | "agenda" | "pengumuman" | "galeri";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State untuk data
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>([]);
  const [galeriList, setGaleriList] = useState<GaleriFoto[]>([]);

  const [initialLoading, setInitialLoading] = useState(true);

  // State untuk form
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Berita | Agenda | Pengumuman | null>(null);

  const [galeriFormOpen, setGaleriFormOpen] = useState(false);
  const [editingGaleri, setEditingGaleri] = useState<GaleriFoto | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }

    const loadData = async () => {
      try {
        const [berita, agenda, pengumuman, galeri] = await Promise.all([
          getBerita(),
          getAgenda(),
          getPengumuman(),
          getGaleri(),
        ]);

        setBeritaList(berita);
        setAgendaList(agenda);
        setPengumumanList(pengumuman);
        setGaleriList(galeri);
      } catch (err) {
        console.error(err);
        toast.error("Gagal memuat data, menampilkan data awal.");
        setBeritaList(initialBerita);
        setAgendaList(initialAgenda);
        setPengumumanList(initialPengumuman);
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    toast.success("Anda telah logout");
    navigate("/admin/login");
  };

  const menuItems = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: LayoutDashboard },
    { id: "berita" as TabType, label: "Berita", icon: Newspaper },
    { id: "agenda" as TabType, label: "Agenda", icon: Calendar },
    { id: "pengumuman" as TabType, label: "Pengumuman", icon: Bell },
    { id: "galeri" as TabType, label: "Galeri", icon: Image },
  ];

  const handleDelete = async (type: TabType, id: string) => {
    try {
      if (type === "berita") {
        await deleteBerita(id);
        setBeritaList((prev) => prev.filter((b) => b.id !== id));
        toast.success("Berita berhasil dihapus");
      } else if (type === "agenda") {
        await deleteAgenda(id);
        setAgendaList((prev) => prev.filter((a) => a.id !== id));
        toast.success("Agenda berhasil dihapus");
      } else if (type === "pengumuman") {
        await deletePengumuman(id);
        setPengumumanList((prev) => prev.filter((p) => p.id !== id));
        toast.success("Pengumuman berhasil dihapus");
      } else if (type === "galeri") {
        await deleteGaleri(id);
        setGaleriList((prev) => prev.filter((g) => g.id !== id));
        toast.success("Galeri berhasil dihapus");
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 border-2 border-foreground bg-background p-2 lg:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r-2 border-foreground bg-background transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b-2 border-foreground p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-primary font-mono text-lg font-bold text-primary-foreground">
                DB
              </div>
              <div>
                <p className="font-bold">Admin Panel</p>
                <p className="text-xs text-muted-foreground">Desa Bugel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setShowForm(false);
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-3 py-2 text-left font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t-2 border-foreground p-4 space-y-2">
            <Link to="/" className="flex w-full items-center gap-3 px-3 py-2 font-medium hover:bg-accent">
              <Home className="h-5 w-5" />
              Lihat Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2 font-medium text-destructive hover:bg-accent"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 pt-16 lg:p-8 lg:pt-8">
        {initialLoading ? (
          <div className="flex h-[60vh] items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Memuat data...</span>
          </div>
        ) : (
          <>
            {activeTab === "dashboard" && (
              <DashboardOverview
                beritaCount={beritaList.length}
                agendaCount={agendaList.length}
                pengumumanCount={pengumumanList.length}
              />
            )}

            {activeTab === "berita" && (
              <ContentManager
                title="Kelola Berita"
                items={beritaList}
                type="berita"
                onAdd={() => setShowForm(true)}
                onEdit={(item) => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
                onDelete={(id) => handleDelete("berita", id)}
                showForm={showForm}
                editingItem={editingItem}
                onFormClose={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                onFormSubmit={async (data) => {
                  if (editingItem) {
                    const updated = await updateBerita(editingItem.id, data as Partial<Berita> & { file?: File | null });
                    setBeritaList((prev) => prev.map((b) => (b.id === editingItem.id ? updated : b)));
                    toast.success("Berita berhasil diperbarui");
                  } else {
                    const created = await createBerita({
                      judul: (data as Berita).judul,
                      ringkasan: (data as Berita).ringkasan,
                      konten: (data as Berita).konten,
                      tanggal: (data as Berita).tanggal,
                      penulis: (data as Berita).penulis || "Admin Desa",
                      file: (data as { file?: File | null }).file || null,
                    });
                    setBeritaList((prev) => [...prev, created]);
                    toast.success("Berita berhasil ditambahkan");
                  }
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            {activeTab === "agenda" && (
              <ContentManager
                title="Kelola Agenda"
                items={agendaList}
                type="agenda"
                onAdd={() => setShowForm(true)}
                onEdit={(item) => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
                onDelete={(id) => handleDelete("agenda", id)}
                showForm={showForm}
                editingItem={editingItem}
                onFormClose={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                onFormSubmit={async (data) => {
                  if (editingItem) {
                    const updated = await updateAgenda(editingItem.id, data as Partial<Agenda>);
                    setAgendaList((prev) => prev.map((a) => (a.id === editingItem.id ? updated : a)));
                    toast.success("Agenda berhasil diperbarui");
                  } else {
                    const created = await createAgenda(data as Omit<Agenda, "id">);
                    setAgendaList((prev) => [...prev, created]);
                    toast.success("Agenda berhasil ditambahkan");
                  }
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            {activeTab === "pengumuman" && (
              <ContentManager
                title="Kelola Pengumuman"
                items={pengumumanList}
                type="pengumuman"
                onAdd={() => setShowForm(true)}
                onEdit={(item) => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
                onDelete={(id) => handleDelete("pengumuman", id)}
                showForm={showForm}
                editingItem={editingItem}
                onFormClose={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                onFormSubmit={async (data) => {
                  if (editingItem) {
                    const updated = await updatePengumuman(editingItem.id, data as Partial<Pengumuman>);
                    setPengumumanList((prev) => prev.map((p) => (p.id === editingItem.id ? updated : p)));
                    toast.success("Pengumuman berhasil diperbarui");
                  } else {
                    const created = await createPengumuman(data as Omit<Pengumuman, "id">);
                    setPengumumanList((prev) => [...prev, created]);
                    toast.success("Pengumuman berhasil ditambahkan");
                  }
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            {activeTab === "galeri" && (
              <GaleriManager
                items={galeriList}
                onAdd={() => setGaleriFormOpen(true)}
                onEdit={(item) => {
                  setEditingGaleri(item);
                  setGaleriFormOpen(true);
                }}
                onDelete={(id) => handleDelete("galeri", id)}
                showForm={galeriFormOpen}
                editingItem={editingGaleri}
                onFormClose={() => {
                  setGaleriFormOpen(false);
                  setEditingGaleri(null);
                }}
                onFormSubmit={async (payload) => {
                  if (editingGaleri) {
                    const updated = await updateGaleri(editingGaleri.id, payload);
                    setGaleriList((prev) => prev.map((g) => (g.id === editingGaleri.id ? updated : g)));
                    toast.success("Galeri diperbarui");
                  } else {
                    const created = await createGaleri(payload);
                    setGaleriList((prev) => [...prev, created]);
                    toast.success("Galeri ditambahkan");
                  }
                  setGaleriFormOpen(false);
                  setEditingGaleri(null);
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

function DashboardOverview({
  beritaCount,
  agendaCount,
  pengumumanCount,
}: {
  beritaCount: number;
  agendaCount: number;
  pengumumanCount: number;
}) {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border-2 border-foreground bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-primary">
              <Newspaper className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold">{beritaCount}</p>
              <p className="text-muted-foreground">Total Berita</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-foreground bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-primary">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold">{agendaCount}</p>
              <p className="text-muted-foreground">Total Agenda</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-foreground bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-primary">
              <Bell className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold">{pengumumanCount}</p>
              <p className="text-muted-foreground">Total Pengumuman</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContentManagerProps {
  title: string;
  items: (Berita | Agenda | Pengumuman)[];
  type: "berita" | "agenda" | "pengumuman";
  onAdd: () => void;
  onEdit: (item: Berita | Agenda | Pengumuman) => void;
  onDelete: (id: string) => void;
  showForm: boolean;
  editingItem: Berita | Agenda | Pengumuman | null;
  onFormClose: () => void;
  onFormSubmit: (data: Partial<Berita | Agenda | Pengumuman> & { file?: File | null }) => Promise<void>;
}

function ContentManager({
  title,
  items,
  type,
  onAdd,
  onEdit,
  onDelete,
  showForm,
  editingItem,
  onFormClose,
  onFormSubmit,
}: ContentManagerProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem as unknown as Record<string, string>);
      setFile(null);
    } else {
      setFormData({
        tanggal: new Date().toISOString().split("T")[0],
        prioritas: "sedang",
        penulis: "Admin Desa",
        gambar: "https://placehold.co/800x450?text=Desa+Bugel",
      });
      setFile(null);
    }
  }, [editingItem, showForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await onFormSubmit({ ...formData, file });
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data");
    } finally {
      setSubmitting(false);
    }
  };

  if (showForm) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {editingItem ? "Edit" : "Tambah"} {title.replace("Kelola ", "")}
          </h1>
          <Button variant="outline" onClick={onFormClose}>
            Batal
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="max-w-2xl border-2 border-foreground bg-card p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="judul">Judul</Label>
              <Input
                id="judul"
                value={formData.judul || ""}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            {type === "berita" && (
              <>
                <div>
                  <Label htmlFor="penulis">Penulis</Label>
                  <Input
                    id="penulis"
                    value={formData.penulis || ""}
                    onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                    placeholder="Admin Desa"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="file">Upload Gambar</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required={!editingItem}
                    className="mt-1"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Unggah gambar untuk berita. Saat edit, biarkan kosong untuk memakai gambar sebelumnya.
                  </p>
                </div>
                <div>
                  <Label htmlFor="ringkasan">Ringkasan</Label>
                  <Textarea
                    id="ringkasan"
                    value={formData.ringkasan || ""}
                    onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="konten">Konten</Label>
                  <Textarea
                    id="konten"
                    rows={6}
                    value={formData.konten || ""}
                    onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {type === "agenda" && (
              <>
                <div>
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Textarea
                    id="deskripsi"
                    value={formData.deskripsi || ""}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="waktu">Waktu</Label>
                  <Input
                    id="waktu"
                    value={formData.waktu || ""}
                    onChange={(e) => setFormData({ ...formData, waktu: e.target.value })}
                    placeholder="08:00 - 12:00 WIB"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lokasi">Lokasi</Label>
                  <Input
                    id="lokasi"
                    value={formData.lokasi || ""}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {type === "pengumuman" && (
              <>
                <div>
                  <Label htmlFor="konten">Konten</Label>
                  <Textarea
                    id="konten"
                    rows={4}
                    value={formData.konten || ""}
                    onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="prioritas">Prioritas</Label>
                  <Select
                    value={formData.prioritas || "sedang"}
                    onValueChange={(value) => setFormData({ ...formData, prioritas: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tinggi">Tinggi</SelectItem>
                      <SelectItem value="sedang">Sedang</SelectItem>
                      <SelectItem value="rendah">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="tanggal">Tanggal</Label>
              <Input
                id="tanggal"
                type="date"
                value={formData.tanggal || ""}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Menyimpan..." : editingItem ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={onAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 border-2 border-foreground bg-card p-4"
          >
            <div className="flex-1">
              <h3 className="font-bold">{item.judul}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(item.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm("Yakin ingin menghapus item ini?")) {
                    onDelete(item.id);
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface GaleriManagerProps {
  items: GaleriFoto[];
  onAdd: () => void;
  onEdit: (item: GaleriFoto) => void;
  onDelete: (id: string) => void;
  showForm: boolean;
  editingItem: GaleriFoto | null;
  onFormClose: () => void;
  onFormSubmit: (payload: CreateGaleriPayload) => Promise<void>;
}

function GaleriManager({
  items,
  onAdd,
  onEdit,
  onDelete,
  showForm,
  editingItem,
  onFormClose,
  onFormSubmit,
}: GaleriManagerProps) {
  const [formData, setFormData] = useState<CreateGaleriPayload>({
    judul: "",
    deskripsi: "",
    tanggal: new Date().toISOString().split("T")[0],
    gambar: "",
    file: null,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        judul: editingItem.judul,
        deskripsi: editingItem.deskripsi,
        tanggal: editingItem.tanggal,
        gambar: editingItem.gambar,
        file: null,
      });
    } else {
      setFormData({
        judul: "",
        deskripsi: "",
        tanggal: new Date().toISOString().split("T")[0],
        gambar: "",
        file: null,
      });
    }
  }, [editingItem, showForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await onFormSubmit(formData);
      setFormData({
        judul: "",
        deskripsi: "",
        tanggal: new Date().toISOString().split("T")[0],
        gambar: "",
        file: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan galeri");
    } finally {
      setSubmitting(false);
    }
  };

  if (showForm) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{editingItem ? "Edit" : "Tambah"} Galeri</h1>
          <Button variant="outline" onClick={onFormClose}>
            Batal
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl border-2 border-foreground bg-card p-6 space-y-4">
          <div>
            <Label htmlFor="judul">Judul</Label>
            <Input
              id="judul"
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea
              id="deskripsi"
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="tanggal">Tanggal</Label>
            <Input
              id="tanggal"
              type="date"
              value={formData.tanggal || ""}
              onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="gambar">URL Gambar (opsional)</Label>
              <Input
                id="gambar"
                type="url"
                value={formData.gambar || ""}
                onChange={(e) => setFormData({ ...formData, gambar: e.target.value })}
                placeholder="https://example.com/gambar.jpg"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="file">Atau Upload Gambar</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                className="mt-1"
              />
              <p className="mt-1 text-xs text-muted-foreground">Pilih salah satu: upload atau isi URL.</p>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Menyimpan..." : editingItem ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Galeri</h1>
        <Button onClick={onAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="border-2 border-foreground bg-card p-6 text-center text-muted-foreground">
          Belum ada foto galeri.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="border-2 border-foreground bg-card">
              <div className="aspect-video overflow-hidden">
                <img src={item.gambar} alt={item.judul} className="h-full w-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold">{item.judul}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.deskripsi}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm("Yakin ingin menghapus foto ini?")) {
                        onDelete(item.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
