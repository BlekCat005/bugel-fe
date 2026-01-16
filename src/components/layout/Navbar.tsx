import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Users, Newspaper, Calendar, Bell, Image, Phone, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Beranda", icon: Home },
  { path: "/profil", label: "Profil Desa", icon: Users },
  { path: "/berita", label: "Berita", icon: Newspaper },
  { path: "/agenda", label: "Agenda", icon: Calendar },
  { path: "/pengumuman", label: "Pengumuman", icon: Bell },
  { path: "/galeri", label: "Galeri", icon: Image },
  { path: "/kontak", label: "Kontak", icon: Phone },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-foreground bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-primary font-mono text-lg font-bold text-primary-foreground">
              DB
            </div>
            <div className="hidden sm:block">
              <p className="font-bold leading-tight">Desa Bugel</p>
              <p className="text-xs text-muted-foreground">Kec. Ciawi, Tasikmalaya</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Admin Login Button */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link to="/admin/login">
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="border-2 border-foreground p-2 lg:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t-2 border-foreground py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 font-medium transition-colors hover:bg-accent ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center gap-3 border-t-2 border-foreground px-4 py-3 font-medium"
              >
                <LogIn className="h-5 w-5" />
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
