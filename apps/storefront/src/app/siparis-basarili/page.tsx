'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Truck,
  ArrowRight,
  ShoppingBag,
  PackageCheck,
  Home,
  ShieldCheck,
  CreditCard,
  MapPin,
  Calendar,
} from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface OrderData {
  orderNumber: string;
  fullName: string;
  phone: string;
  email: string;
  fullAddress: string;
  items?: { name: string; quantity: number; price: number }[];
  total: number;
  note?: string;
  whatsappUrl?: string;
  paymentMethodTitle: string;
  createdAt: string;
}

function OrderSuccessContent(): React.JSX.Element {
  const searchParams = useSearchParams();
  const orderNumberParam = searchParams.get('orderNumber');

  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wakko_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const displayOrderNo = order?.orderNumber || orderNumberParam || 'WAKKO-2026-84729';
  const finalWhatsAppUrl =
    order?.whatsappUrl ||
    (order
      ? getWhatsAppUrl(order as any)
      : getWhatsAppUrl({
          orderNumber: displayOrderNo,
          fullName: 'Değerli Müşterimiz',
          phone: '',
          fullAddress: 'Belirtilen Teslimat Adresi',
          items: [],
          total: 104.7,
        }));

  return (
    <div className="bg-[#FFF8F6] min-h-[85vh] py-12 md:py-20 flex items-center justify-center relative overflow-hidden">
      {/* Soft Ambient Background Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FDC979]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#9C3A50]/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#ECE0DD] shadow-2xl text-center space-y-6">
          {/* Animated Success Badge */}
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-60" />
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-md relative z-10">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          </div>

          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              Sipariş Başarıyla Oluşturuldu
            </span>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#201A19]">
              Siparişiniz Alındı!
            </h1>
            <p className="text-xs sm:text-sm text-[#554244] max-w-md mx-auto mt-2 leading-relaxed">
              Wakko Pasta Süsleri'ni tercih ettiğiniz için teşekkür ederiz. Siparişiniz özenle hazırlanıp kargoya teslim edilecektir.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-[#FFF8F6] rounded-2xl p-6 border border-[#ECE0DD] text-left space-y-4 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-[#ECE0DD]">
              <div>
                <span className="text-[11px] font-bold text-[#887174] uppercase tracking-wider block">
                  Sipariş No
                </span>
                <span className="font-serif-title text-base sm:text-lg font-extrabold text-[#9C3A50]">
                  #{displayOrderNo}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#887174] uppercase tracking-wider block">
                  Ödeme Türü
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#201A19]">
                  {order?.paymentMethodTitle || 'Kapıda Nakit Ödeme'}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#887174] uppercase tracking-wider block">
                  Ödenecek Tutar
                </span>
                <span className="font-serif-title text-base sm:text-lg font-black text-[#9C3A50]">
                  ₺{order?.total ? order.total.toFixed(2) : '104.70'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#9C3A50] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#201A19] block">Teslimat Adresi:</span>
                  <p className="text-[#554244] mt-0.5 leading-relaxed">
                    {order?.fullAddress || 'Moda Cad. No: 42 D: 5, Kadıköy / İstanbul'}
                  </p>
                  {order?.fullName && (
                    <p className="text-[11px] font-medium text-[#887174] mt-0.5">
                      Alıcı: {order.fullName} ({order.phone})
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Truck className="w-4 h-4 text-[#346647] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#201A19] block">Tahmini Teslimat:</span>
                  <p className="text-[#346647] font-semibold mt-0.5">
                    1 - 3 İş Günü İçerisinde Kapınızda
                  </p>
                  <p className="text-[11px] text-[#554244] mt-0.5">
                    Kurye gelmeden önce SMS ile teslimat kodu iletilecektir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Notification Card */}
          <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 border-2 border-emerald-500/30 rounded-2xl p-6 sm:p-7 text-center space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-center space-x-2 text-emerald-900 font-extrabold text-sm sm:text-base">
              <span className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#1EBE5D] text-lg">
                📲
              </span>
              <span>Siparişinizi WhatsApp'tan Hemen Onaylatın</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Siparişinizin kargo hazırlık sürecini hızlandırmak ve anında bilgi almak için aşağıdaki butona basarak detayları <strong>işletme WhatsApp hattımıza</strong> tek tıkla iletebilirsiniz.
            </p>
            <div>
              <a
                href={finalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-6 h-6 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp ile İşletmeye İlet ve Onayla</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              Butona bastığınızda WhatsApp uygulamanız hazır sipariş mesajı ile açılır.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Alışverişe Devam Et</span>
            </Link>

            <Link
              href="/hesabim"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#FFF8F6] text-[#201A19] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full border border-[#ECE0DD] shadow-xs transition-all"
            >
              <PackageCheck className="w-4 h-4 text-[#9C3A50]" />
              <span>Siparişlerimi Görüntüle</span>
            </Link>
          </div>

          <p className="text-[11px] text-[#887174] pt-2">
            Sorularınız ve sipariş güncellemeleri için destek hattımız:{' '}
            <strong className="text-[#201A19]">+90 (532) 330 07 02</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage(): React.JSX.Element {
  return (
    <React.Suspense
      fallback={
        <div className="bg-[#FFF8F6] min-h-[85vh] py-20 flex items-center justify-center">
          <div className="text-center font-bold text-slate-600 text-sm">Sipariş yükleniyor...</div>
        </div>
      }
    >
      <OrderSuccessContent />
    </React.Suspense>
  );
}
