import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const mockWishlist = [
  {
    id: '1',
    name: 'Gold Pleksi "Happy Birthday" Pasta Süsü',
    slug: 'gold-pleksi-happy-birthday-pasta-susu',
    category: 'Pasta Süsleri',
    price: 49.90,
    discountPrice: 39.90,
    rating: 5.0,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600',
  },
];

export default function WishlistPage(): React.JSX.Element {
  return (
    <div className="bg-[#FFF8F6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif-title text-3xl font-extrabold text-[#201A19] mb-8 flex items-center space-x-3">
          <Heart className="w-8 h-8 text-[#9C3A50]" />
          <span>Favorilerim ({mockWishlist.length} Ürün)</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockWishlist.map((product) => (
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
                  <span className="text-base font-extrabold text-[#9C3A50]">₺{product.discountPrice.toFixed(2)}</span>
                  <button className="bg-[#9C3A50] hover:bg-[#7A2B3C] text-white p-2.5 rounded-full shadow transition">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
