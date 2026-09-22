'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, ArrowRight } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviews: number;
  image: string;
}

export default function WishlistPage(): React.JSX.Element {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wakko_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWishlist(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-[#FFF8F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif-title text-3xl font-extrabold text-[#201A19] mb-8 flex items-center space-x-3">
          <Heart className="w-8 h-8 text-[#9C3A50]" />
          <span>Favorilerim ({wishlist.length} Ürün)</span>
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#ECE0DD] shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FFF8F6] text-[#9C3A50] flex items-center justify-center mx-auto mb-4 border border-[#ECE0DD]">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif-title text-xl font-bold text-[#201A19] mb-2">Favori Listeniz Boş</h2>
            <p className="text-sm text-[#554244] mb-6">
              Henüz favorilerinize ürün eklemediniz. Beğendiğiniz ürünlerin üzerindeki kalp ikonuna tıklayarak buraya ekleyebilirsiniz.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-sm px-6 py-3 rounded-full transition shadow-md"
            >
              <span>Alışverişe Başla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-[#ECE0DD] rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#FFD9DE] transition duration-300 relative"
              >
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
                    <span className="text-base font-extrabold text-[#9C3A50]">
                      ₺{(product.discountPrice || product.price).toFixed(2)}
                    </span>
                    <button className="bg-[#9C3A50] hover:bg-[#7A2B3C] text-white p-2.5 rounded-full shadow transition">
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
  );
}
