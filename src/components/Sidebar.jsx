import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, ArrowRight, Sparkles } from 'lucide-react';
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
  const { sources, news, selectedCategory, setSelectedCategory } = useCms();

  // Filter berita yang ditandai trending
  const trendingNews = useMemo(() => {
    return news.filter((item) => item.trending);
  }, [news]);

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

  // Ambil 5 berita random untuk highlight (stabil, hanya berubah saat refresh)
  const highlightRef = useRef(null);
  const highlightNews = useMemo(() => {
    if (news.length === 0) return [];
    if (highlightRef.current && highlightRef.current.length > 0) return highlightRef.current;
    const shuffled = [...news].sort(() => 0.5 - Math.random());
    highlightRef.current = shuffled.slice(0, 5);
    return highlightRef.current;
  }, [news]);

  return (
    <div className="space-y-5 lg:sticky lg:top-20">
      {/* Trending */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center gap-2 mb-4">
          <Flame size={20} className="text-orange-500" />
          <h3 className="font-bold text-gray-900 dark:text-white">Sedang Trending</h3>
        </div>
        {trendingNews.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-3">Belum ada berita trending.</p>
        )}
        <div className="space-y-3">
          {trendingNews.map((item, index) => (
            <div key={item.id} className="flex items-start gap-3 group cursor-pointer">
              <span className="text-lg font-black text-gray-300 dark:text-gray-600 w-6 text-right">{index + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.catColor}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </div>
              <TrendingUp size={14} className="text-green-500 shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Highlight Berita */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-[#35CE8D]" />
          <h3 className="font-bold text-gray-900 dark:text-white">Highlight Berita</h3>
        </div>
        {highlightNews.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-3">Belum ada berita.</p>
        )}
        <div className="space-y-3">
          {highlightNews.map((item) => (
            <div key={item.id} className="group cursor-pointer flex gap-3">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 shrink-0 flex items-center justify-center">
                  <Sparkles size={18} className="text-gray-300 dark:text-gray-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${item.catColor}`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gray-400">{item.time}</span>
                </div>
              </div>
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
        className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Kategori</h3>
        {categories.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-3">Belum ada kategori.</p>
        )}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
          >
            ✕ Hapus filter
          </button>
        )}
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-colors group text-left ${
                selectedCategory === cat.name
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 ring-2 ring-emerald-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${
                  selectedCategory === cat.name ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                }`}>{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.count} berita</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>



      {/* Footer Mini */}
      <div className="text-xs text-gray-400 px-2 space-y-1">
        <p>Tentang &middot; Kebijakan Privasi &middot; Ketentuan &middot; Iklan</p>
        <p>&copy; 2026 KabarKini. All rights reserved.</p>
      </div>
    </div>
  );
}