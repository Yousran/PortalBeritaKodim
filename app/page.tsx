import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import Link from "next/link";

const beritaUtama = [
  {
    id: 1,
    kategori: "Operasi",
    judul:
      "Kodim 1408/MKS Gelar Operasi Penegakan Ketertiban di Wilayah Perbatasan",
    ringkasan:
      "Satuan Kodim 1408/MKS bersama aparat kepolisian setempat melaksanakan operasi gabungan penegakan ketertiban di sepanjang jalur perbatasan administratif Kota Makassar pada Senin pagi.",
    tanggal: "20 Februari 2026",
  },
  {
    id: 2,
    kategori: "Sosial",
    judul:
      "Prajurit Kodim Bagikan Ratusan Paket Sembako kepada Warga Kurang Mampu",
    ringkasan:
      "Dalam rangka menyambut Hari Ulang Tahun TNI, para prajurit Kodim 1408/MKS membagikan ratusan paket sembako kepada warga kurang mampu di tiga kelurahan Kota Makassar.",
    tanggal: "19 Februari 2026",
  },
  {
    id: 3,
    kategori: "Pendidikan",
    judul: "Kodim 1408/MKS Dukung Program Literasi Sekolah di Daerah Terpencil",
    ringkasan:
      "Sebagai wujud kepedulian terhadap dunia pendidikan, Kodim 1408/MKS mengirimkan sejumlah prajurit untuk menjadi tutor sukarela di sekolah-sekolah terpencil di Kabupaten Gowa.",
    tanggal: "18 Februari 2026",
  },
  {
    id: 4,
    kategori: "Kesehatan",
    judul: "Karya Bakti TNI: Pengobatan Gratis Digelar di Tiga Kecamatan",
    ringkasan:
      "Kodim 1408/MKS menggelar kegiatan pengobatan gratis bagi masyarakat di tiga kecamatan pinggiran Kota Makassar bekerja sama dengan Dinas Kesehatan setempat.",
    tanggal: "17 Februari 2026",
  },
  {
    id: 5,
    kategori: "Infrastruktur",
    judul: "TNI Bantu Rehab Jalan Desa yang Rusak Akibat Banjir",
    ringkasan:
      "Pasukan Kodim 1408/MKS bahu-membahu bersama warga dan pemerintah desa memperbaiki jalan desa yang rusak parah akibat banjir bandang yang melanda dua minggu lalu.",
    tanggal: "16 Februari 2026",
  },
  {
    id: 6,
    kategori: "Ketahanan Pangan",
    judul: "Kodim Dorong Program Ketahanan Pangan Melalui Pertanian Keluarga",
    ringkasan:
      "Dalam mendukung program pemerintah tentang ketahanan pangan nasional, Kodim 1408/MKS mengajak seluruh keluarga prajurit aktif memanfaatkan lahan pekarangan untuk bertani.",
    tanggal: "15 Februari 2026",
  },
];

const galeri = [
  { id: 1, label: "Apel Pagi Bersama", warna: "bg-red-200 dark:bg-red-900" },
  {
    id: 2,
    label: "Latihan Lintas Alam",
    warna: "bg-green-200 dark:bg-green-900",
  },
  { id: 3, label: "Bhakti Sosial", warna: "bg-blue-200 dark:bg-blue-900" },
  {
    id: 4,
    label: "Upacara HUT TNI",
    warna: "bg-yellow-200 dark:bg-yellow-900",
  },
  {
    id: 5,
    label: "Patroli Wilayah",
    warna: "bg-purple-200 dark:bg-purple-900",
  },
  {
    id: 6,
    label: "Pelatihan Masyarakat",
    warna: "bg-orange-200 dark:bg-orange-900",
  },
];

export default function BerandaPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar variant="public" />

      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-900 px-6 pt-16 text-center text-white">
        <span className="mb-4 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
          Portal Berita Resmi
        </span>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Kodim 1408/MKS
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-300">
          Informasi terkini seputar kegiatan, operasi, dan program sosial
          Komando Distrik Militer 1408 Makassar — Maeiki A&apos;bulo Sibatang.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/program-pembinaan"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Program Pembinaan
          </Link>
          <Link
            href="/kontak"
            className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>

      {/* Berita Terkini */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
          Berita Terkini
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beritaUtama.map((berita) => (
            <article
              key={berita.id}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="mb-3 w-fit rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {berita.kategori}
              </span>
              <h3 className="mb-2 text-base font-bold leading-snug text-zinc-900 dark:text-white">
                {berita.judul}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {berita.ringkasan}
              </p>
              <p className="mt-4 text-xs text-zinc-400">{berita.tanggal}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Statistik */}
      <section className="bg-zinc-900 py-16 text-white dark:bg-zinc-800">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold">
            Kami dalam Angka
          </h2>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { angka: "1.200+", label: "Prajurit Aktif" },
              { angka: "48", label: "Koramil" },
              { angka: "320+", label: "Kegiatan Sosial / Tahun" },
              { angka: "15", label: "Kabupaten / Kota" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold text-white">{s.angka}</p>
                <p className="mt-1 text-sm text-zinc-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
          Galeri Kegiatan
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galeri.map((item) => (
            <div
              key={item.id}
              className={`flex h-40 items-center justify-center rounded-2xl text-sm font-semibold text-zinc-700 dark:text-zinc-200 ${
                item.warna
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* Visi Misi */}
      <section className="bg-white py-16 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
            Visi &amp; Misi
          </h2>
          <p className="mb-10 text-zinc-500 dark:text-zinc-400">
            Kodim 1408/MKS berkomitmen menjaga stabilitas keamanan dan membantu
            kesejahteraan masyarakat di wilayah Sulawesi Selatan.
          </p>
          <div className="grid gap-6 text-left md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700">
              <h3 className="mb-2 font-bold text-zinc-900 dark:text-white">
                🎯 Visi
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Terwujudnya Kodim 1408/MKS yang profesional, modern, dan
                berwibawa guna mendukung pertahanan negara serta kesejahteraan
                rakyat di wilayah Sulawesi Selatan.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700">
              <h3 className="mb-2 font-bold text-zinc-900 dark:text-white">
                📋 Misi
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                <li>• Meningkatkan kesiapan operasional satuan.</li>
                <li>• Memperkuat hubungan TNI dan rakyat.</li>
                <li>• Mendukung program pemerintah daerah.</li>
                <li>• Melaksanakan bakti sosial secara berkala.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pengumuman */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
          Pengumuman
        </h2>
        <div className="space-y-4">
          {[
            "Rekrutmen Tenaga Administrasi Kodim 1408/MKS — Pendaftaran dibuka hingga 28 Februari 2026.",
            "Jadwal Sidang Bulanan Dewan Perwira — dilaksanakan pada 25 Februari 2026 pukul 08.00 WITA.",
            "Pelatihan Bela Diri Masyarakat — terbuka untuk umum, daftar di Kantor Koramil terdekat.",
            "Penerimaan Donasi untuk Korban Bencana Alam di Kabupaten Luwu Utara.",
          ].map((teks, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{teks}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kutipan */}
      <section className="bg-blue-700 px-6 py-20 text-center text-white dark:bg-blue-900">
        <blockquote className="mx-auto max-w-2xl">
          <p className="text-2xl font-bold leading-snug">
            &ldquo;Maeiki A&apos;bulo Sibatang — Bersatu Seperti Bambu, Kuat Tak
            Terpatahkan.&rdquo;
          </p>
          <cite className="mt-4 block text-sm text-blue-200">
            — Semboyan Kodim 1408/MKS
          </cite>
        </blockquote>
      </section>

      <Footer />
    </div>
  );
}
