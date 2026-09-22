'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, PackageOpen } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  slug?: string;
  category: string;
  price: number;
  discountPrice?: number | null;
  rating?: number;
  reviews?: number;
  badge?: string | null;
  image?: string;
}

export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wakko_admin_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setProducts(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  return (
    <section className="py-14 bg-white border-t border-b border-[#ECE0DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#9C3A50] tracking-widest uppercase">
            Sizin İçin Seçtiklerimiz
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#201A19] mt-1">
            Öne Çıkan Lüks Pasta Süsleri
          </h2>
          <p className="text-sm text-[#554244] mt-2">
            En çok tercih edilen, yüksek kaliteli ve şık detaylara sahip pasta aksesuarları.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-[#FFF8F6] rounded-3xl p-10 text-center border border-[#ECE0DD] max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-white text-[#9C3A50] flex items-center justify-center mx-auto mb-3 border border-[#ECE0DD] shadow-xs">
              <PackageOpen className="w-7 h-7" />
            </div>
            <h3 className="font-serif-title text-lg font-bold text-[#201A19] mb-1">Henüz Öne Çıkan Ürün Yok</h3>
            <p className="text-xs text-[#554244] mb-4">
              Veritabanında henüz kayıtlı ürün bulunmamaktadır. Admin panelinden ürün eklediğinizde burada listelenecektir.
            </p>
            <Link
              href="/urunler"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#9C3A50] hover:text-[#7A2B3C] underline"
            >
              <span>Kataloğu Görüntüle</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-[#FFF8F6] border border-[#ECE0DD] rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#FFD9DE] transition duration-300 relative"
              >
                {/* Top Badges */}
                <div className="flex items-center justify-between z-10">
                  {product.badge ? (
                    <span className="bg-[#9C3A50] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow">
                      {product.badge}
                    </span>
                  ) : <span />}

                  <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#554244] hover:text-[#9C3A50] flex items-center justify-center shadow-sm hover:scale-110 transition">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Image */}
                <div className="relative my-4 overflow-hidden rounded-xl bg-white h-48 flex items-center justify-center">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                  />
                </div>

                {/* Product Details */}
                <div>
                  <span className="text-[11px] font-semibold text-[#78530A] uppercase tracking-wider">
                    {product.category}
                  </span>

                  <Link href={`/urun/${product.slug || product.id}`}>
                    <h3 className="font-serif-title text-base font-bold text-[#201A19] group-hover:text-[#9C3A50] transition line-clamp-2 mt-1">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center space-x-1 mt-2 text-xs text-[#78530A]">
                    <Star className="w-3.5 h-3.5 fill-current text-[#FDC979]" />
                    <span className="font-bold text-[#201A19]">{product.rating || 5.0}</span>
                    <span className="text-[#554244]">({product.reviews || 0})</span>
                  </div>

                  {/* Price & Action */}
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
    </section>
  );
};
