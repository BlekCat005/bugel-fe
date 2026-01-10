import { useState, useEffect } from "react";
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
} from "@/data/dummyData";

type TabType = "dashboard" | "berita" | "agenda" | "pengumuman" | "galeri";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State untuk data
  const [beritaList, setBeritaList] = useState<Berita[]>(initialBerita);
  const [agendaList, setAgendaList] = useState<Agenda[]>(initialAgenda);
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>(initialPengumuman);

  // State untuk form
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Berita | Agenda | Pengumuman | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
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

  const handleDelete = (type: TabType, id: string) => {
    if (type === "berita") {
      setBeritaList(beritaList.filter((b) => b.id !== id));
      toast.success("Berita berhasil dihapus");
    } else if (type === "agenda") {
      setAgendaList(agendaList.filter((a) => a.id !== id));
      toast.success("Agenda berhasil dihapus");
    } else if (type === "pengumuman") {
      setPengumumanList(pengumumanList.filter((p) => p.id !== id));
      toast.success("Pengumuman berhasil dihapus");
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
            onFormSubmit={(data) => {
              if (editingItem) {
                setBeritaList(beritaList.map((b) => (b.id === editingItem.id ? { ...b, ...data } : b)));
                toast.success("Berita berhasil diperbarui");
              } else {
                setBeritaList([...beritaList, { ...data, id: Date.now().toString() } as Berita]);
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
            onFormSubmit={(data) => {
              if (editingItem) {
                setAgendaList(agendaList.map((a) => (a.id === editingItem.id ? { ...a, ...data } : a)));
                toast.success("Agenda berhasil diperbarui");
              } else {
                setAgendaList([...agendaList, { ...data, id: Date.now().toString() } as Agenda]);
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
            onFormSubmit={(data) => {
              if (editingItem) {
                setPengumumanList(
                  pengumumanList.map((p) => (p.id === editingItem.id ? { ...p, ...data } : p))
                );
                toast.success("Pengumuman berhasil diperbarui");
              } else {
                setPengumumanList([
                  ...pengumumanList,
                  { ...data, id: Date.now().toString() } as Pengumuman,
                ]);
                toast.success("Pengumuman berhasil ditambahkan");
              }
              setShowForm(false);
              setEditingItem(null);
            }}
          />
        )}

        {activeTab === "galeri" && (
          <div>
            <h1 className="mb-6 text-2xl font-bold">Kelola Galeri</h1>
            <div className="border-2 border-foreground bg-card p-8 text-center">
              <Image className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Fitur upload galeri memerlukan backend. Aktifkan Lovable Cloud untuk menggunakan fitur ini.
              </p>
            </div>
          </div>
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
  onFormSubmit: (data: Partial<Berita | Agenda | Pengumuman>) => void;
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

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem as unknown as Record<string, string>);
    } else {
      setFormData({
        tanggal: new Date().toISOString().split("T")[0],
        prioritas: "sedang",
        penulis: "Admin Desa",
      });
    }
  }, [editingItem, showForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
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

            <Button type="submit" className="w-full">
              {editingItem ? "Simpan Perubahan" : "Tambah"}
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
