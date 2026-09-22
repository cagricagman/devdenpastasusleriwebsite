'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';

const featuredProducts = [
  {
    id: '1',
    name: 'Gold Pleksi "Happy Birthday" Pasta Süsü',
    slug: 'gold-pleksi-happy-birthday-pasta-susu',
    category: 'Pasta Süsleri',
    price: 49.90,
    discountPrice: 39.90,
    rating: 5.0,
    reviews: 42,
    badge: 'Çok Satan',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600',
  },
  {
    id: '2',
    name: 'Rose Gold "İyi Ki Doğdun" Pasta Topper',
    slug: 'rose-gold-iyi-ki-dogdun-pasta-topper',
    category: 'Pasta Süsleri',
    price: 54.90,
    discountPrice: 44.90,
    rating: 4.9,
    reviews: 28,
    badge: 'İndirim',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600',
  },
  {
    id: '3',
    name: 'Altın Metal İncili Minyatür Pasta Tacı',
    slug: 'altin-metal-incili-minyatur-pasta-taci',
    category: 'Taçlar & Aksesuarlar',
    price: 89.90,
    discountPrice: 74.90,
    rating: 5.0,
    reviews: 19,
    badge: 'Yeni',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600',
  },
  {
    id: '4',
    name: '3D Maket Kelebek Seti (12 Parça - Rose Gold)',
    slug: '3d-maket-kelebek-seti-12-parca-rose-gold',
    category: 'Pasta Üstü Dekorasyon',
    price: 34.90,
    discountPrice: null,
    rating: 4.8,
    reviews: 35,
    badge: null,
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600',
  },
];

export const FeaturedProducts: React.FC = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                />
              </div>

              {/* Product Details */}
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
      </div>
    </section>
  );
};
