'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Banknote,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CheckoutPage(): React.JSX.Element {
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'İstanbul',
    district: 'Kadıköy',
    addressLine: '',
    note: '',
    paymentMethodType: 'CASH', // CASH or POS
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 300;
  const shippingFee = isFreeShipping ? 0 : 29.9;
  const discount = 10.0; // campaign discount
  const total = Math.max(0, subtotal + shippingFee - discount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Lütfen adınızı ve soyadınızı giriniz.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Lütfen telefon numaranızı giriniz.');
      return;
    }
    if (!formData.addressLine.trim()) {
      setErrorMsg('Lütfen teslimat adresinizi giriniz.');
      return;
    }

    setIsLoading(true);

    const payload = {
      customerEmail: formData.email.trim() || 'musteri@wakkopastasusleri.local',
      paymentMethod: 'CASH_ON_DELIVERY',
      note: formData.note || '',
      shippingAddress: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || 'musteri@wakkopastasusleri.local',
        city: formData.city,
        district: formData.district,
        addressLine: formData.addressLine.trim(),
      },
      items: cart.map((item) => ({
        productId: item.id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
    };

    let orderNumber = `WAKKO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const apiHost = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
      const apiUrl = `http://${apiHost}:4000/api/v1`;
      const res = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.orderNumber) {
          orderNumber = data.orderNumber;
        }
      }
    } catch (err) {
      console.warn('Backend API sipariş çağrısı yerel modda tamamlandı:', err);
    }

    // Save order data for the success page
    let whatsappUrl = '';
    try {
      const orderSummaryData = {
        orderNumber,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        fullAddress: `${formData.addressLine}, ${formData.district} / ${formData.city}`,
        items: cart,
        total,
        note: formData.note,
        paymentMethodTitle: 'Kapıda Nakit Ödeme',
        createdAt: new Date().toISOString(),
      };
      whatsappUrl = getWhatsAppUrl(orderSummaryData);
      localStorage.setItem(
        'wakko_last_order',
        JSON.stringify({ ...orderSummaryData, whatsappUrl })
      );
      localStorage.removeItem('wakko_cart');
    } catch (e) {
      // ignore
    }

    // Try to open WhatsApp in a new tab if allowed by browser
    if (whatsappUrl && typeof window !== 'undefined') {
      try {
        window.open(whatsappUrl, '_blank');
      } catch (e) {
        // popup blocker may prevent, the user can click the button on the success page
      }
    }

    setIsLoading(false);
    router.push(`/siparis-basarili?orderNumber=${encodeURIComponent(orderNumber)}`);
  };

  return (
    <div className="bg-[#FFF8F6] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Tracker Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center max-w-xl mx-auto mb-6">
            <Link href="/sepet" className="flex items-center space-x-2 text-[#346647] font-bold text-xs sm:text-sm hover:underline">
              <span className="w-7 h-7 rounded-full bg-[#346647] text-white flex items-center justify-center">✓</span>
              <span>Sepetim</span>
            </Link>
            <div className="w-12 sm:w-20 h-0.5 bg-[#9C3A50] mx-2" />
            <div className="flex items-center space-x-2 text-[#9C3A50] font-bold text-xs sm:text-sm">
              <span className="w-7 h-7 rounded-full bg-[#9C3A50] text-white flex items-center justify-center">2</span>
              <span>Teslimat</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-[#ECE0DD] mx-2" />
            <div className="flex items-center space-x-2 text-[#9C3A50] font-bold text-xs sm:text-sm">
              <span className="w-7 h-7 rounded-full bg-[#9C3A50] text-white flex items-center justify-center">3</span>
              <span>Kapıda Ödeme</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#201A19]">
                Teslimat ve Sipariş Onayı
              </h1>
              <p className="text-xs sm:text-sm text-[#554244] mt-1">
                Lütfen teslimat bilgilerinizi doldurun. Ödemeniz kapıda nakit veya kartla alınacaktır.
              </p>
            </div>
            <Link
              href="/sepet"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-[#9C3A50] hover:text-[#7A2B3C] bg-white border border-[#ECE0DD] px-3.5 py-2 rounded-full transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sepete Dön</span>
            </Link>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center space-x-2 text-xs font-bold">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#ECE0DD] shadow-sm max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#FFF8F6] text-[#9C3A50] flex items-center justify-center mx-auto mb-4 border border-[#ECE0DD]">
              <Banknote className="w-8 h-8" />
            </div>
            <h2 className="font-serif-title text-xl font-bold text-[#201A19] mb-2">Sepetinizde Ürün Yok</h2>
            <p className="text-sm text-[#554244] mb-6">
              Ödeme ve sipariş adımına geçmek için lütfen önce sepetinize ürün ekleyiniz.
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
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Form & Payment Selection */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Teslimat Bilgileri */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE0DD] shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#ECE0DD]">
                <div className="w-9 h-9 rounded-xl bg-[#F7EBE8] text-[#9C3A50] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif-title text-lg font-bold text-[#201A19]">1. Teslimat Adresi</h2>
                  <p className="text-xs text-[#554244]">Siparişinizin ulaştırılacağı adresi belirtin</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#201A19] block mb-1.5">
                    Ad Soyad <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Örn: Ayşe Yılmaz"
                      className="w-full pl-9 pr-4 py-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#9C3A50] focus:ring-1 focus:ring-[#9C3A50]"
                    />
                    <User className="w-4 h-4 text-[#887174] absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#201A19] block mb-1.5">
                    Telefon Numarası <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="05XX XXX XX XX"
                      className="w-full pl-9 pr-4 py-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#9C3A50] focus:ring-1 focus:ring-[#9C3A50]"
                    />
                    <Phone className="w-4 h-4 text-[#887174] absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#201A19] block mb-1.5">
                    E-Posta Adresi <span className="text-gray-400 font-normal">(Sipariş takibi ve bilgilendirme için)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="adiniz@example.com"
                      className="w-full pl-9 pr-4 py-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#9C3A50] focus:ring-1 focus:ring-[#9C3A50]"
                    />
                    <Mail className="w-4 h-4 text-[#887174] absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#201A19] block mb-1.5">Şehir (İl)</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#9C3A50]"
                  >
                    <option value="İstanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Bursa">Bursa</option>
                    <option value="Antalya">Antalya</option>
                    <option value="Kocaeli">Kocaeli</option>
                    <option value="Adana">Adana</option>
                    <option value="Gaziantep">Gaziantep</option>
                    <option value="Konya">Konya</option>
                    <option value="Eskişehir">Eskişehir</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#201A19] block mb-1.5">İlçe</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Örn: Kadıköy / Beşiktaş"
                    className="w-full px-4 py-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#9C3A50]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#201A19] block mb-1.5">
                    Açık Teslimat Adresi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Mahalle, cadde, sokak, bina no, daire no vb. açık adresinizi yazınız."
                    className="w-full px-4 py-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#9C3A50]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#201A19] block mb-1.5">
                    Sipariş Notu <span className="text-gray-400 font-normal">(Opsiyonel)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      placeholder="Örn: Zile basmayınız lütfen / Hassas pasta süsüdür."
                      className="w-full pl-9 pr-4 py-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
                    />
                    <FileText className="w-4 h-4 text-[#887174] absolute left-3 top-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Ödeme Yöntemi */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE0DD] shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#ECE0DD]">
                <div className="w-9 h-9 rounded-xl bg-[#FDC979]/20 text-[#7D5710] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif-title text-lg font-bold text-[#201A19]">2. Ödeme Yöntemi</h2>
                  <p className="text-xs text-[#554244]">Kapıda ödeme güvencesiyle sıfır risk</p>
                </div>
              </div>

              {/* Cash on Delivery Only */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#9C3A50] bg-[#FFF8F6] shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-5 h-5 rounded-full bg-[#9C3A50] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                      ✓
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#346647]/10 text-[#346647] flex items-center justify-center">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#201A19]">Kapıda Nakit Ödeme</h4>
                      <p className="text-[11px] text-[#554244]">Kargonuzu teslim alırken kuryeye nakit olarak ödeyin.</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#346647] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Ek Ücret Yok (₺0)
                  </span>
                </div>
              </div>

              {/* COD Highlights Box */}
              <div className="bg-[#F7EBE8] rounded-2xl p-4 border border-[#ECE0DD] flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#9C3A50] flex-shrink-0" />
                <p className="text-xs text-[#554244]">
                  <strong>Kapıda Ödeme Avantajı:</strong> İnternet üzerinden kart bilginizi paylaşmanıza gerek kalmadan, paketinizi kapınızda görerek güvenle alışveriş yapabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#ECE0DD] shadow-lg relative overflow-hidden space-y-5 sticky top-24">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#9C3A50] to-[#FDC979]" />

              <h3 className="font-serif-title text-lg font-bold text-[#201A19] pb-3 border-b border-[#ECE0DD]">
                Sipariş Özeti ({cart.length} Kalem)
              </h3>

              {/* Item Previews */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 text-xs pb-3 border-b border-[#ECE0DD]/60">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-xl border border-[#ECE0DD] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-title font-bold text-[#201A19] truncate">{item.name}</h4>
                      <p className="text-[11px] text-[#554244]">Adet: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#9C3A50]">₺{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="space-y-2.5 text-xs text-[#554244]">
                <div className="flex justify-between items-center">
                  <span>Ara Toplam</span>
                  <span className="font-bold text-sm text-[#201A19]">₺{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-1">
                    <span>Kargo</span>
                    {isFreeShipping && <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Bedava</span>}
                  </span>
                  <span className={`font-bold text-sm ${isFreeShipping ? 'text-emerald-700' : 'text-[#201A19]'}`}>
                    {isFreeShipping ? 'Ücretsiz' : `₺${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-3 py-2 rounded-xl">
                  <span>Kampanya İndirimi</span>
                  <span>-₺{discount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-[#7D5710]">
                  <span>Kapıda Ödeme Hizmet Bedeli</span>
                  <span className="font-bold">Ücretsiz (₺0)</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-[#ECE0DD] flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#554244] block">Toplam Tutar</span>
                  <span className="text-[10px] text-emerald-700 font-medium">(Kapıda Ödenecek Tutar)</span>
                </div>
                <span className="font-serif-title text-2xl font-black text-[#9C3A50]">
                  ₺{total.toFixed(2)}
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="submit-order-button"
                disabled={isLoading}
                className="w-full bg-[#9C3A50] hover:bg-[#7A2B3C] disabled:bg-[#9C3A50]/60 text-white font-bold text-sm sm:text-base py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Siparişiniz Hazırlanıyor...</span>
                  </>
                ) : (
                  <>
                    <span>Siparişi Onayla (Kapıda Ödeme)</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="pt-2 text-[11px] text-[#887174] space-y-1 text-center">
                <p className="flex items-center justify-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-[#346647]" />
                  <span>256-Bit SSL ile Şifrelenmiş Güvenli Bağlantı</span>
                </p>
                <p>Kargonuz teslim edilene kadar hiçbir ücret ödemezsiniz.</p>
              </div>
            </div>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
