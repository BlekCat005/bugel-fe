import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi login - nanti bisa diganti dengan autentikasi sesungguhnya
    setTimeout(() => {
      if (formData.email === "admin@desabugel.id" && formData.password === "admin123") {
        localStorage.setItem("isAdminLoggedIn", "true");
        toast.success("Login berhasil! Selamat datang Admin.");
        navigate("/admin/dashboard");
      } else {
        toast.error("Email atau password salah!");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="border-2 border-foreground bg-card p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-foreground bg-primary font-mono text-2xl font-bold text-primary-foreground">
              DB
            </div>
            <h1 className="text-2xl font-bold">Login Admin</h1>
            <p className="text-sm text-muted-foreground">Desa Bugel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@desabugel.id"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              <LogIn className="h-4 w-4" />
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="mt-6 border-t-2 border-foreground pt-4">
            <p className="text-center text-sm text-muted-foreground">
              Demo: admin@desabugel.id / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
