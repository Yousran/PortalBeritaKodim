import Link from "next/link";
import Navbar from "@/components/custom/navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar variant="dashboard" />

      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-900 px-6 pt-16 text-center text-white">
        <span className="mb-4 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
          Dashboard
        </span>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Selamat Datang
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-300">
          Kelola postingan, berita tertutup, pengguna, kategori, dan pesan dalam
          satu platform.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard/posts"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Lihat Postingan
          </Link>
          <Link
            href="/dashboard/users"
            className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Kelola Pengguna
          </Link>
        </div>
      </section>
    </div>
  );
}
