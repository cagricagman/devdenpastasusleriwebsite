import React from 'react';
import Link from 'next/link';
import { ChevronRight, Filter, SlidersHorizontal, ShoppingCart, Heart, Star } from 'lucide-react';

const mockAllProducts = [
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
  {
    id: '5',
    name: 'Altın Işıltılı Yenebilir Toz Sprey Sim (10g)',
    slug: 'altin-isiltili-yenebilir-toz-sprey-sim-10g',
    category: 'Renkli Gıda Boyaları',
    price: 64.90,
    discountPrice: null,
    rating: 4.7,
    reviews: 22,
    badge: null,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600',
  },
];

export default function AllProductsPage(): React.JSX.Element {
  return (
    <div className="bg-[#FFF8F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#554244] mb-6">
          <Link href="/" className="hover:text-[#9C3A50] transition">Anasayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#554244]/50" />
          <span className="font-bold text-[#9C3A50]">Tüm Ürünler</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-[#ECE0DD] shadow-sm mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-[#9C3A50] uppercase tracking-widest">Katalog</span>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#201A19] mt-1">
              Tüm Pasta Süsleri & Aksesuarları
            </h1>
            <p className="text-xs sm:text-sm text-[#554244] mt-2 leading-relaxed">
              Wakko'nun geniş ürün yelpazesinden en güzel pasta topperları, mumları ve dekorasyon malzemelerini keşfedin.
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
              </div>

              {/* Categories Checklist */}
              <div>
                <h4 className="text-xs font-bold text-[#201A19] mb-2">Kategoriler</h4>
                <div className="space-y-1.5 text-xs text-[#554244]">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#9C3A50]" defaultChecked />
                    <span>Pasta Süsleri & Topperlar</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#9C3A50]" defaultChecked />
                    <span>Standlı Pasta Süsleri</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#9C3A50]" defaultChecked />
                    <span>Pasta Mumları</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#9C3A50]" defaultChecked />
                    <span>Yenebilir İnciler & Şekerler</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-4 border border-[#ECE0DD] flex items-center justify-between text-xs">
              <span className="text-[#554244] font-medium">Toplam <strong className="text-[#201A19]">22</strong> ürün listeleniyor</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAllProducts.map((product) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}
