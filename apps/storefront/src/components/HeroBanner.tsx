'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FFF0F2] via-[#FFF8F6] to-[#FFE4B8]/30 py-12 md:py-20 border-b border-[#ECE0DD]">
      {/* Background Decorative Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FFD9DE]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FDC979]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white border border-[#FFD9DE] rounded-full shadow-xs">
              <Sparkles className="w-4 h-4 text-[#9C3A50]" />
              <span className="text-xs font-bold text-[#9C3A50] tracking-wide uppercase">
                Yeni Sezon Pasta Dekorasyonu
              </span>
            </div>

            <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#201A19] leading-tight">
              Pastalarınıza <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C3A50] via-[#BB5268] to-[#78530A]">
                Zarafet ve Parıltı
              </span> Katın.
            </h1>

            <p className="text-base sm:text-lg text-[#554244] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Doğum günleri, nişan ve özel kutlamalarınız için lüks pleksi topper süsler, yenebilir inciler, parlak taçlar ve profesyonel pastacılık aksesuarları.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/kategori/pasta-susleri"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition duration-300"
              >
                <span>Koleksiyonu Keşfet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/kategori/standli-pasta-susleri"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#FFF0F2] text-[#9C3A50] border-2 border-[#9C3A50] font-bold text-sm px-8 py-3.5 rounded-full transition duration-300"
              >
                <span>Standlı Süsler</span>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs font-semibold text-[#554244]">
              <div className="flex items-center space-x-1">
                <div className="flex text-[#FDC979]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="pl-1 text-[#201A19] font-bold">4.9 / 5</span>
              </div>
              <span>•</span>
              <span>10.000+ Mutlu Müşteri</span>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <img
                src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800"
                alt="Wakko Lüks Pasta Süsü"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="bg-[#FDC979] text-[#78530A] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase self-start mb-2">
                  Çok Satan
                </span>
                <h3 className="font-serif-title text-xl font-bold">Gold Pleksi "Happy Birthday" Süsü</h3>
                <p className="text-xs text-white/90">Ayna efektli parlak gold kaplama özel tasarım.</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-[#FDC979]">₺39,90 <span className="line-through text-xs text-white/70">₺49,90</span></span>
                  <span className="text-xs underline font-semibold cursor-pointer">İncele →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
