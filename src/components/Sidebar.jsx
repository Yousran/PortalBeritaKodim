import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Hash, Flame, ArrowRight } from 'lucide-react';
import { useCms } from '../store/cmsStore.jsx';

const categoryColors = {
  'Politik': 'bg-red-500',
  'Ekonomi': 'bg-emerald-500',
  'Teknologi': 'bg-blue-500',
  'Olahraga': 'bg-orange-500',
  'Hiburan': 'bg-purple-500',
  'Kesehatan': 'bg-rose-500',
  'Pendidikan': 'bg-cyan-500',
  'Lingkungan': 'bg-lime-500',
  'Bisnis': 'bg-amber-500',
};

export default function Sidebar() {
  const { trending, sources, news } = useCms();

  // Hitung jumlah berita per kategori dari data sebenarnya
  const categories = useMemo(() => {
    const countMap = {};
    news.forEach((item) => {
      const cat = item.category;
      if (cat) {
        countMap[cat] = (countMap[cat] || 0) + 1;
      }
    });

    return Object.entries(countMap)
      .map(([name, count]) => ({
        name,
        count,
        color: categoryColors[name] || 'bg-gray-500',
      }))
      .sort((a, b) => b.count - a.count);
  }, [news]);

  return (
    <div className="space-y-5 lg:sticky lg:top-20">
      {/* Trending */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <Flame size={20} className="text-orange-500" />
          <h3 className="font-bold text-gray-900">Sedang Trending</h3>
        </div>
        {trending.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-3">Belum ada trending topic.</p>
        )}
        <div className="space-y-3">
          {trending.map((item, index) => (
            <div key={item.id} className="flex items-start gap-3 group cursor-pointer">
              <span className="text-lg font-black text-gray-300 w-6 text-right">{index + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <Hash size={14} className="text-indigo-400 shrink-0" />
                  <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{item.posts}</p>
              </div>
              <TrendingUp size={14} className="text-green-500 shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
      >
        <h3 className="font-bold text-gray-900 mb-4">Kategori</h3>
        {categories.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-3">Belum ada kategori.</p>
        )}
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group text-left"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 truncate">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.count} berita</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Suggested Follows */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
      >
        <h3 className="font-bold text-gray-900 mb-4">Sumber Berita</h3>
        {sources.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-3">Belum ada sumber berita.</p>
        )}
        <div className="space-y-3">
          {sources.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <img src={s.avatar || 'https://i.pravatar.cc/40?img=0'} alt={s.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{s.name}</p>
                <p className="text-xs text-gray-400">{s.handle}</p>
              </div>
              <button className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors shrink-0">
                Ikuti
              </button>
            </div>
          ))}
        </div>
        {sources.length > 0 && (
          <button className="flex items-center gap-1 text-sm text-indigo-600 font-medium mt-4 hover:text-indigo-800 transition-colors">
            Lihat semua <ArrowRight size={14} />
          </button>
        )}
      </motion.div>

      {/* Footer Mini */}
      <div className="text-xs text-gray-400 px-2 space-y-1">
        <p>Tentang &middot; Kebijakan Privasi &middot; Ketentuan &middot; Iklan</p>
        <p>&copy; 2026 KabarKini. All rights reserved.</p>
      </div>
    </div>
  );
}