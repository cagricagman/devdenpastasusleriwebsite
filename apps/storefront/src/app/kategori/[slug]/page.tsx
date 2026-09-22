import React from 'react';
import Link from 'next/link';
import { ChevronRight, Filter, SlidersHorizontal, ShoppingCart, Heart, Star, PackageOpen, ArrowRight } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number | null;
  rating: number;
  reviews: number;
  badge?: string | null;
  image: string;
}

const mockCategoryProducts: ProductItem[] = [];

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || 'pasta-susleri';
  const categoryTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="bg-[#FFF8F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#554244] mb-6">
          <Link href="/" className="hover:text-[#9C3A50] transition">Anasayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#554244]/50" />
          <Link href="/urunler" className="hover:text-[#9C3A50] transition">Kategoriler</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#554244]/50" />
          <span className="font-bold text-[#9C3A50]">{categoryTitle}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-3xl p-8 border border-[#ECE0DD] shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD9DE]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-[#9C3A50] uppercase tracking-widest">Kategori Koleksiyonu</span>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#201A19] mt-1">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#554244] mt-2 leading-relaxed">
              En lüks ve şık {categoryTitle.toLowerCase()} modelleri ile kutlamalarınıza parıltı katın. Özel tasarım pleksi ve kaliteli pastacılık süsleri.
            </p>
          </div>
        </div>

        {/* Filter and Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filter */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-[#ECE0DD] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE0DD]">
                <h3 className="font-serif-title text-sm font-bold text-[#201A19] flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-[#9C3A50]" />
                  <span>Filtrele</span>
                </h3>
                <button className="text-[11px] text-[#9C3A50] font-semibold hover:underline">Temizle</button>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs font-bold text-[#201A19] mb-2">Fiyat Aralığı (TL)</h4>
                <div className="flex items-center space-x-2 text-xs">
                  <input type="number" placeholder="Min" className="w-full px-3 py-1.5 bg-[#FFF8F6] border border-[#ECE0DD] rounded-lg text-xs" />
                  <span>-</span>
                  <input type="number" placeholder="Max" className="w-full px-3 py-1.5 bg-[#FFF8F6] border border-[#ECE0DD] rounded-lg text-xs" />
                </div>
              </div>

              {/* Material Option */}
              <div>
                <h4 className="text-xs font-bold text-[#201A19] mb-2">Malzeme Türü</h4>
                <div className="space-y-1.5 text-xs text-[#554244]">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#9C3A50]" defaultChecked />
                    <span>Gold Aynalı Pleksi</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#9C3A50]" defaultChecked />
                    <span>Rose Gold Pleksi</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#9C3A50]" />
                    <span>Gümüş Aynalı Pleksi</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#9C3A50]" />
                    <span>Ahşap & Doğal</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sorting Header */}
            <div className="bg-white rounded-2xl p-4 border border-[#ECE0DD] flex items-center justify-between text-xs">
              <span className="text-[#554244] font-medium">Toplam <strong className="text-[#201A19]">{mockCategoryProducts.length}</strong> ürün listeleniyor</span>
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#9C3A50]" />
                <select className="bg-[#FFF8F6] border border-[#ECE0DD] rounded-lg px-3 py-1.5 font-bold text-[#201A19] focus:outline-none">
                  <option>Akıllı Sıralama</option>
                  <option>Fiyat: Düşükten Yükseğe</option>
                  <option>Fiyat: Yüksekten Düşüğe</option>
                  <option>En Çok Satanlar</option>
                </select>
              </div>
            </div>

            {/* Products Cards or Empty State */}
            {mockCategoryProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#ECE0DD] shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#FFF8F6] text-[#9C3A50] flex items-center justify-center mx-auto mb-4 border border-[#ECE0DD]">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <h3 className="font-serif-title text-xl font-bold text-[#201A19] mb-2">Bu Kategoride Henüz Ürün Yok</h3>
                <p className="text-sm text-[#554244] max-w-md mx-auto mb-6">
                  Bu kategoriye henüz sergilenecek ürün eklenmemiştir. Yeni ürünler yüklendiğinde burada sergilenecektir.
                </p>
                <Link
                  href="/urunler"
                  className="inline-flex items-center space-x-2 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs px-5 py-2.5 rounded-full transition shadow-md"
                >
                  <span>Tüm Ürünleri Gör</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCategoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white border border-[#ECE0DD] rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#FFD9DE] transition duration-300 relative"
                  >
                    <div className="flex items-center justify-between z-10">
                      {product.badge ? (
                        <span className="bg-[#9C3A50] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow">
                          {product.badge}
                        </span>
                      ) : <span />}

                      <button className="w-8 h-8 rounded-full bg-[#FFF8F6] text-[#554244] hover:text-[#9C3A50] flex items-center justify-center shadow-xs hover:scale-110 transition">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="relative my-4 overflow-hidden rounded-xl bg-white h-48 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-[#78530A] uppercase tracking-wider">
                        {product.category}
                      </span>

                      <Link href={`/urun/${product.slug}`}>
                        <h3 className="font-serif-title text-base font-bold text-[#201A19] group-hover:text-[#9C3A50] transition line-clamp-2 mt-1">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-1 mt-2 text-xs text-[#78530A]">
                        <Star className="w-3.5 h-3.5 fill-current text-[#FDC979]" />
                        <span className="font-bold text-[#201A19]">{product.rating}</span>
                        <span className="text-[#554244]">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#ECE0DD]">
                        <div>
                          {product.discountPrice ? (
                            <div className="flex items-baseline space-x-1.5">
                              <span className="text-base font-extrabold text-[#9C3A50]">₺{product.discountPrice.toFixed(2)}</span>
                              <span className="text-xs text-[#554244] line-through">₺{product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-base font-extrabold text-[#201A19]">₺{product.price.toFixed(2)}</span>
                          )}
                        </div>

                        <button className="bg-[#9C3A50] hover:bg-[#7A2B3C] text-white p-2.5 rounded-full shadow hover:shadow-md transition">
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
