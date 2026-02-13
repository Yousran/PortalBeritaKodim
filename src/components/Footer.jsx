import React from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Clock } from 'lucide-react';

const navLinks = [
  { name: 'Beranda', path: '/' },
  { name: 'Program Pembinaan', path: '/program-pembinaan' },
  { name: 'Bhakti TNI', path: '/bhakti-tni' },
  { name: 'Kontak', path: '/kontak' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/cropped-logo_kodim1408makassar-removebg-preview-1.png"
                alt="Logo Kodim 1408 Makassar"
                className="w-[48px] h-[48px] object-contain"
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  Info<span className="text-[#35CE8D]">Kodim</span>
                </span>
                <span className="text-xs text-gray-400 font-medium">Kodim 1408 Makassar</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Website resmi portal berita dan informasi Kodim 1408 Makassar. Menyajikan berita terkini seputar kegiatan, program pembinaan teritorial, serta Bhakti TNI di wilayah Kota Makassar dan sekitarnya.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.path} className="hover:text-[#35CE8D] transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="text-white font-semibold mb-4">Jam Operasional</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-[#35CE8D] mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-300">Senin – Jumat</p>
                  <p className="text-gray-400">08.00 – 16.00 WITA</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-[#35CE8D] mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-300">Sabtu</p>
                  <p className="text-gray-400">08.00 – 12.00 WITA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-[#35CE8D] shrink-0" />
                <a href="mailto:info@kodim1408makassar.id" className="hover:text-[#35CE8D] transition-colors">info@kodim1408makassar.id</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-[#35CE8D] shrink-0" />
                <a href="tel:+62411123456" className="hover:text-[#35CE8D] transition-colors">(0411) 123-4567</a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="text-[#35CE8D] mt-0.5 shrink-0" />
                Jl. Perintis Kemerdekaan No.45, Kota Makassar, Sulawesi Selatan
              </p>
            </div>
            <div className="flex gap-3 mt-5">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#306B34] transition-colors" title="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-[#306B34] transition-colors" title="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} InfoKodim — Kodim 1408 Makassar. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/kontak" className="hover:text-[#35CE8D] transition-colors">Kontak</a>
            <a href="/program-pembinaan" className="hover:text-[#35CE8D] transition-colors">Program</a>
            <a href="/bhakti-tni" className="hover:text-[#35CE8D] transition-colors">Bhakti TNI</a>
          </div>
        </div>
      </div>
    </footer>
  );
}