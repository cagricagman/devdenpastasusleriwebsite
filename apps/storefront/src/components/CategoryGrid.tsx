'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    title: 'Pasta Süsleri & Topperlar',
    count: '120+ Model',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600',
    slug: 'pasta-susleri',
    size: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
  {
    title: 'Standlı Pasta Süsleri',
    count: '45+ Çeşit',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600',
    slug: 'standli-pasta-susleri',
    size: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    title: 'Pasta Mumları',
    count: '80+ Renk & Rakam',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600',
    slug: 'pasta-mumlari',
    size: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    title: 'Yenebilir İnciler & Şekerler',
    count: '60+ Ürün',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600',
    slug: 'sekerlemeler-ve-inciler',
    size: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-12 bg-[#FFF8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#9C3A50] tracking-widest uppercase">
              Kategorileri İnceleyin
            </span>
            <h2 className="font-serif-title text-3xl font-extrabold text-[#201A19] mt-1">
              Popüler Dekorasyon Kategorileri
            </h2>
          </div>
          <Link
            href="/urunler"
            className="text-xs font-bold text-[#9C3A50] hover:text-[#7A2B3C] flex items-center space-x-1 underline"
          >
            <span>Tüm Kategorileri Gör</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className={`${cat.size} group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-500`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201A19]/80 via-[#201A19]/30 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs font-semibold text-[#FDC979] tracking-wider uppercase mb-1">
                  {cat.count}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-title text-xl font-bold text-white group-hover:text-[#FFD9DE] transition">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#9C3A50] group-hover:scale-110 transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
