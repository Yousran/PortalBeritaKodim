import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Youtube, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Program Pembinaan", href: "/program-pembinaan" },
  { label: "Bhakti TNI", href: "/bhakti-tni" },
  { label: "Kontak", href: "/kontak" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Logo Kodim 1408 Makassar"
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  Info<span className="text-emerald-400">Kodim</span>
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  Kodim 1408 Makassar
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Website resmi portal berita dan informasi Kodim 1408 Makassar.
              Menyajikan berita terkini seputar kegiatan, program pembinaan
              teritorial, serta Bhakti TNI di wilayah Kota Makassar dan
              sekitarnya.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="text-white font-semibold mb-4">Jam Operasional</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-zinc-300">Senin – Jumat</p>
                  <p className="text-zinc-400">08.00 – 16.00 WITA</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-zinc-300">Sabtu</p>
                  <p className="text-zinc-400">08.00 – 12.00 WITA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-emerald-400 shrink-0" />
                <a
                  href="mailto:humas@kodim1408mks.mil.id"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  humas@kodim1408mks.mil.id
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-emerald-400 shrink-0" />
                <a
                  href="tel:+624111234567"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  (0411) 123-4567
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin
                  size={16}
                  className="text-emerald-400 mt-0.5 shrink-0"
                />
                <span className="text-zinc-400">
                  Jl. Tentara Pelajar No.1, Makassar, Sulawesi Selatan 90111
                </span>
              </p>
            </div>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-emerald-700 hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-emerald-700 hover:text-white transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-zinc-800" />

        <div className="pt-6 flex flex-col items-center gap-3 text-sm text-zinc-500 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} InfoKodim — Kodim 1408 Makassar.
            Hak cipta dilindungi.
          </p>
          <div className="flex gap-4">
            <Link
              href="/kontak"
              className="hover:text-emerald-400 transition-colors"
            >
              Kontak
            </Link>
            <Link
              href="/program-pembinaan"
              className="hover:text-emerald-400 transition-colors"
            >
              Program
            </Link>
            <Link
              href="/bhakti-tni"
              className="hover:text-emerald-400 transition-colors"
            >
              Bhakti TNI
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
