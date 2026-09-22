'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Cake, Flame, Crown, Diamond, Package, Palette } from 'lucide-react';

const categories = [
  { name: 'Tüm Ürünler', slug: '', icon: Sparkles },
  { name: 'Pasta Süsleri', slug: 'pasta-susleri', icon: Cake },
  { name: 'Standlı Pasta Süsleri', slug: 'standli-pasta-susleri', icon: Diamond },
  { name: 'Pasta Üstü Dekorasyon', slug: 'pasta-ustu-dekorasyonlar', icon: Crown },
  { name: 'Pasta Mumları', slug: 'pasta-mumlari', icon: Flame },
  { name: 'Taçlar & Aksesuarlar', slug: 'taclar-ve-prenses-aksesuarlari', icon: Crown },
  { name: 'Şekerlemeler & İnciler', slug: 'sekerlemeler-ve-inciler', icon: Diamond },
  { name: 'Pastacılık Ekipmanları', slug: 'pasta-ekipmanlari', icon: Package },
  { name: 'Renkli Gıda Boyaları', slug: 'renkli-gida-boyalari', icon: Palette },
];

export const CategoryNav: React.FC = () => {
  return (
    <nav className="bg-white border-b border-[#ECE0DD] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none py-2.5">
        <ul className="flex items-center space-x-1 sm:space-x-2 min-w-max">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isFirst = idx === 0;

            return (
              <li key={cat.slug || 'all'}>
                <Link
                  href={cat.slug ? `/kategori/${cat.slug}` : '/urunler'}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    isFirst
                      ? 'bg-[#FFD9DE] text-[#400014] hover:bg-[#9C3A50] hover:text-white'
                      : 'text-[#554244] hover:bg-[#FFF0F2] hover:text-[#9C3A50]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#9C3A50]" />
                  <span>{cat.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
