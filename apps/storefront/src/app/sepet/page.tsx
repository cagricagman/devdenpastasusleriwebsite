'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, Truck, Sparkles, CheckCircle2, Tag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const INITIAL_CART: CartItem[] = [];

export default function CartPage(): React.JSX.Element {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wakko_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('wakko_cart', JSON.stringify(newCart));
    } catch (e) {
      // ignore
    }
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    updateCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'WAKKO10') {
      setAppliedDiscount(10.0);
      setCouponMessage('WAKKO10 indirim kuponu uygulandı (-₺10.00)');
    } else if (couponCode.trim().toUpperCase() === 'BAHAR20') {
      setAppliedDiscount(20.0);
      setCouponMessage('BAHAR20 indirim kuponu uygulandı (-₺20.00)');
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Geçersiz indirim kuponu.');
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 300;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : 29.9;
  const total = Math.max(0, subtotal + shippingFee - appliedDiscount);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProceedToCheckout = () => {
    try {
      localStorage.setItem('wakko_cart', JSON.stringify(cart));
      localStorage.setItem(
        'wakko_checkout_summary',
        JSON.stringify({
          subtotal,
          shippingFee,
          discount: appliedDiscount,
          total,
        })
      );
    } catch (e) {
      // ignore
    }
    router.push('/odeme');
  };

  return (
    <div className="bg-[#FFF8F6] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-center max-w-xl mx-auto mb-6">
            <div className="flex items-center space-x-2 text-[#9C3A50] font-bold text-xs sm:text-sm">
              <span className="w-7 h-7 rounded-full bg-[#9C3A50] text-white flex items-center justify-center">1</span>
              <span>Sepetim</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-[#ECE0DD] mx-2" />
            <div className="flex items-center space-x-2 text-[#887174] text-xs sm:text-sm">
              <span className="w-7 h-7 rounded-full bg-[#F7EBE8] text-[#887174] flex items-center justify-center">2</span>
              <span>Teslimat</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-[#ECE0DD] mx-2" />
            <div className="flex items-center space-x-2 text-[#887174] text-xs sm:text-sm">
              <span className="w-7 h-7 rounded-full bg-[#F7EBE8] text-[#887174] flex items-center justify-center">3</span>
              <span>Kapıda Ödeme</span>
            </div>
          </div>

          <h1 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#201A19] flex items-center space-x-3">
            <ShoppingBag className="w-8 h-8 text-[#9C3A50]" />
            <span>Alışveriş Sepetim ({totalItemsCount} Ürün)</span>
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#ECE0DD] shadow-sm max-w-lg mx-auto">
            <ShoppingBag className="w-16 h-16 text-[#ECE0DD] mx-auto mb-4" />
            <h2 className="font-serif-title text-xl font-bold text-[#201A19] mb-2">Sepetiniz Boş</h2>
            <p className="text-sm text-[#554244] mb-6">Sepetinizde henüz ürün bulunmuyor. Pastalarınızı süsleyecek harika ürünlerimize göz atın!</p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-sm px-6 py-3 rounded-full transition shadow-md"
            >
              <span>Alışverişe Başla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Progress Alert */}
              <div className="bg-white rounded-2xl p-4 border border-[#ECE0DD] shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-[#201A19] mb-2">
                  <span className="flex items-center space-x-1.5 text-[#346647]">
                    <Truck className="w-4 h-4 text-[#346647]" />
                    {isFreeShipping ? (
                      <span>Tebrikler! Ücretsiz kargo fırsatı kazandınız!</span>
                    ) : (
                      <span>
                        Ücretsiz Kargo için{' '}
                        <strong className="text-[#9C3A50]">₺{(freeShippingThreshold - subtotal).toFixed(2)}</strong> daha
                        ekleyin!
                      </span>
                    )}
                  </span>
                  <span className="text-[#7D5710]">Hedef: ₺{freeShippingThreshold}</span>
                </div>
                <div className="w-full h-2 bg-[#F1E6E2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FDC979] to-[#346647] transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#ECE0DD] shadow-sm divide-y divide-[#ECE0DD]">
                {cart.map((item) => (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-2xl border border-[#ECE0DD] shadow-sm flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-serif-title text-sm sm:text-base font-bold text-[#201A19]">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#554244] mt-0.5">Kategori: {item.category}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm font-extrabold text-[#9C3A50]">
                            ₺{item.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] bg-[#F7EBE8] text-[#80253C] px-2 py-0.5 rounded-full font-bold">
                            Adet: ₺{item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6">
                      {/* Quantity Stepper */}
                      <div className="flex items-center space-x-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl px-3 py-1.5 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white border border-[#ECE0DD] flex items-center justify-center text-[#9C3A50] hover:bg-[#9C3A50] hover:text-white transition shadow-2xs"
                          aria-label="Azalt"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-sm font-extrabold text-[#201A19]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-[#ECE0DD] flex items-center justify-center text-[#9C3A50] hover:bg-[#9C3A50] hover:text-white transition shadow-2xs"
                          aria-label="Artır"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="font-bold text-sm text-[#201A19] min-w-[70px] text-right">
                        ₺{(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-[#887174] hover:text-[#BA1A1A] p-2 rounded-xl hover:bg-[#FFDAD6]/40 transition"
                        title="Ürünü Sepetten Kaldır"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantees Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-[#ECE0DD] flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7EBE8] text-[#9C3A50] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#201A19]">Güvenli Kapıda Ödeme</h4>
                    <p className="text-[11px] text-[#554244]">Kargonuzu görüp teslim alırken ödeyin.</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#ECE0DD] flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8F6] text-[#7D5710] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#201A19]">Gıda Temasına Uygun</h4>
                    <p className="text-[11px] text-[#554244]">%100 sertifikalı birinci sınıf pleksi malzeme.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-[#ECE0DD] shadow-lg relative overflow-hidden space-y-5">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#9C3A50] to-[#FDC979]" />

                <h3 className="font-serif-title text-lg font-bold text-[#201A19] pb-3 border-b border-[#ECE0DD]">
                  Sipariş Özeti
                </h3>

                <div className="space-y-3 text-xs text-[#554244]">
                  <div className="flex justify-between items-center">
                    <span>Ara Toplam</span>
                    <span className="font-bold text-sm text-[#201A19]">₺{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-1">
                      <span>Kargo Ücreti</span>
                      {isFreeShipping && <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Bedava</span>}
                    </span>
                    <span className={`font-bold text-sm ${isFreeShipping ? 'text-emerald-700' : 'text-[#201A19]'}`}>
                      {isFreeShipping ? 'Ücretsiz' : `₺${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-3 py-2 rounded-xl">
                      <span className="flex items-center space-x-1">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Kampanya İndirimi</span>
                      </span>
                      <span>-₺{appliedDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Coupon Code Box */}
                <div className="pt-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="İndirim Kodu"
                      className="flex-1 px-3 py-2.5 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs uppercase font-bold text-[#201A19] focus:outline-none focus:border-[#9C3A50]"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="px-4 py-2.5 bg-[#F7EBE8] hover:bg-[#ECE0DD] text-[#9C3A50] font-bold text-xs rounded-xl transition"
                    >
                      Uygula
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[11px] mt-1.5 ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-[#ECE0DD] flex justify-between items-center">
                  <div>
                    <span className="text-xs text-[#554244] block">Toplam Tutar</span>
                    <span className="text-[10px] text-emerald-700 font-medium">(KDV ve Kargo Dahil)</span>
                  </div>
                  <span className="font-serif-title text-2xl font-black text-[#9C3A50]">
                    ₺{total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout CTA Button */}
                <button
                  type="button"
                  id="checkout-proceed-button"
                  onClick={handleProceedToCheckout}
                  className="w-full bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <span>Siparişi Tamamla (Kapıda Ödeme)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-[#887174] text-center flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#346647]" />
                  <span>256-Bit SSL ile Güvenli Alışveriş</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
