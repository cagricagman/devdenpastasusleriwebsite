import React from 'react';
import Link from 'next/link';
import { ChevronRight, Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || 'gold-pleksi-happy-birthday-pasta-susu';
  const productName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="bg-[#FFF8F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#554244] mb-6">
          <Link href="/" className="hover:text-[#9C3A50] transition">Anasayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#554244]/50" />
          <Link href="/kategori/pasta-susleri" className="hover:text-[#9C3A50] transition">Pasta Süsleri</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#554244]/50" />
          <span className="font-bold text-[#9C3A50] truncate max-w-xs">{productName}</span>
        </nav>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ECE0DD] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-[#FFF8F6] border border-[#ECE0DD] h-80 sm:h-96 flex items-center justify-center">
              <span className="absolute top-4 left-4 bg-[#9C3A50] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase shadow">
                Çok Satan
              </span>
              <img
                src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800"
                alt={productName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Specs & Buying Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#78530A] uppercase tracking-wider">
                Pasta Süsleri & Topperlar
              </span>
              <h1 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#201A19] mt-1">
                {productName}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center space-x-4 mt-3 text-xs">
                <div className="flex items-center space-x-1 text-[#78530A]">
                  <Star className="w-4 h-4 fill-current text-[#FDC979]" />
                  <span className="font-bold text-[#201A19]">5.0</span>
                  <span className="text-[#554244]">(42 değerlendirme)</span>
                </div>
                <span>•</span>
                <span className="text-emerald-700 font-bold flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>Stokta Var (120 Adet)</span>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="p-4 rounded-2xl bg-[#FFF8F6] border border-[#ECE0DD] flex items-baseline space-x-3">
              <span className="text-3xl font-extrabold text-[#9C3A50]">₺39.90</span>
              <span className="text-sm text-[#554244] line-through font-semibold">₺49.90</span>
              <span className="bg-[#9C3A50]/10 text-[#9C3A50] text-xs font-bold px-2 py-0.5 rounded-md">
                %20 İndirim
              </span>
            </div>

            {/* Product Description */}
            <p className="text-xs sm:text-sm text-[#554244] leading-relaxed">
              Yüksek kaliteli aynalı akrilik pleksi malzemeden üretilmiştir. Doğum günü pastaları, nişan ve özel kutlama tasarımlarına eşsiz bir şıklık ve parıltı katar. Gıda ile temasa uygun özel çubuğu ile pastanıza kolayca yerleştirilir.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-2">
              <button className="flex-1 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-sm py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Sepete Ekle</span>
              </button>

              <button className="p-4 rounded-full border-2 border-[#ECE0DD] hover:border-[#9C3A50] text-[#554244] hover:text-[#9C3A50] transition shadow-xs">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges Summary */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#ECE0DD] text-center text-[11px] text-[#554244]">
              <div className="p-3 bg-[#FFF0F2] rounded-xl border border-[#FFD9DE]">
                <Truck className="w-5 h-5 text-[#9C3A50] mx-auto mb-1" />
                <span className="font-bold block text-[#201A19]">Aynı Gün Kargo</span>
                <span>300 TL Üzeri Ücretsiz</span>
              </div>
              <div className="p-3 bg-[#FFF0F2] rounded-xl border border-[#FFD9DE]">
                <ShieldCheck className="w-5 h-5 text-[#9C3A50] mx-auto mb-1" />
                <span className="font-bold block text-[#201A19]">Gıda Uyumlu</span>
                <span>Sertifikalı Pleksi</span>
              </div>
              <div className="p-3 bg-[#FFF0F2] rounded-xl border border-[#FFD9DE]">
                <RotateCcw className="w-5 h-5 text-[#9C3A50] mx-auto mb-1" />
                <span className="font-bold block text-[#201A19]">Kolay İade</span>
                <span>14 Gün Garantili</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
