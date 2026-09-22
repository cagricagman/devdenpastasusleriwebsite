'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  MapPin,
  CreditCard,
  Package,
  Calendar,
  Phone,
  Mail,
  Send,
} from 'lucide-react';

export default function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}): React.JSX.Element {
  const [status, setStatus] = useState<'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'>('PROCESSING');
  const [cargoTrackingCode, setCargoTrackingCode] = useState('YRT-92801928');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateCargo = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SHIPPED');
    showNotification(`Kargo takip numarası (${cargoTrackingCode}) kaydedildi ve sipariş 'Kargoda' durumuna güncellendi.`);
  };

  const orderData = {
    orderNumber: 'WAKKO-2026-00001',
    date: '24 Ağustos 2026 - 18:45',
    customer: {
      name: 'Ayşe Yılmaz',
      email: 'ayse@example.com',
      phone: '0532 111 22 33',
      address: 'Merkez Mahallesi, Cumhuriyet Caddesi, Menekşe Apt. No:15 D:4, Kadıköy / İstanbul',
      billingAddress: 'Bireysel Fatura - Aynı Adres',
    },
    payment: {
      method: 'Kapıda Nakit / Kredi Kartı',
      status: 'Ödeme Bekleniyor',
      subtotal: 154.80,
      shipping: 29.90,
      discount: 0,
      total: 184.70,
    },
    items: [
      {
        id: '1',
        name: 'Gold Pleksi "Happy Birthday" Pasta Süsü',
        sku: 'GB-TOPPER-GLD-01',
        price: 39.90,
        quantity: 2,
        total: 79.80,
        image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=200',
      },
      {
        id: '2',
        name: 'Altın Metal İncili Minyatür Pasta Tacı',
        sku: 'TAC-CROWN-GLD-01',
        price: 75.00,
        quantity: 1,
        total: 75.00,
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200',
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#201A19] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#9C3A50]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <Link
            href="/orders"
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#9C3A50]">
              <Package className="w-4 h-4" />
              <span>Sipariş Detayı</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5 flex items-center space-x-3">
              <span>Sipariş {orderData.orderNumber}</span>
              {status === 'DELIVERED' && (
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  Teslim Edildi
                </span>
              )}
              {status === 'SHIPPED' && (
                <span className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold">
                  Kargoda
                </span>
              )}
              {status === 'PROCESSING' && (
                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                  Hazırlanıyor
                </span>
              )}
              {status === 'PENDING' && (
                <span className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                  Onay Bekliyor
                </span>
              )}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>Faturayı Yazdır</span>
          </button>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as typeof status);
              showNotification('Sipariş durumu güncellendi.');
            }}
            className="px-4 py-2.5 bg-[#9C3A50] text-white font-bold text-xs rounded-xl shadow-md focus:outline-none cursor-pointer"
          >
            <option value="PENDING">Durum: Onay Bekliyor</option>
            <option value="PROCESSING">Durum: Hazırlanıyor</option>
            <option value="SHIPPED">Durum: Kargoda</option>
            <option value="DELIVERED">Durum: Teslim Edildi</option>
          </select>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Items Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Package className="w-4 h-4 text-[#9C3A50]" />
              <span>Sipariş Edilen Ürünler ({orderData.items.length} Kalem)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Ürün Detayı</th>
                    <th className="py-3 px-4">Birim Fiyat</th>
                    <th className="py-3 px-4">Adet</th>
                    <th className="py-3 px-4 text-right">Toplam Tutar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orderData.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-slate-200" />
                        <div>
                          <span className="block font-semibold text-slate-900">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">₺{item.price.toFixed(2)}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{item.quantity} Adet</td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-[#9C3A50]">₺{item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Breakdown */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <div className="w-full sm:w-64 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Ara Toplam:</span>
                  <span className="font-semibold text-slate-900">₺{orderData.payment.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Kargo Ücreti:</span>
                  <span className="font-semibold text-slate-900">₺{orderData.payment.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                  <span>Genel Toplam:</span>
                  <span className="text-[#9C3A50]">₺{orderData.payment.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cargo Tracking Management */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Truck className="w-4 h-4 text-[#9C3A50]" />
              <span>Kargo Takip & Lojistik Bilgileri</span>
            </h3>

            <form onSubmit={handleUpdateCargo} className="flex items-center space-x-3 text-xs">
              <div className="flex-1">
                <label className="font-bold text-slate-700 block mb-1">Yurtiçi / Aras Kargo Takip Numarası</label>
                <input
                  type="text"
                  value={cargoTrackingCode}
                  onChange={(e) => setCargoTrackingCode(e.target.value)}
                  placeholder="Kargo takip no girin..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <button
                type="submit"
                className="mt-5 px-5 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold rounded-xl transition flex items-center space-x-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kaydet & Bildir</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-[#9C3A50]" />
              <span>Müşteri Bilgileri</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Ad Soyad</span>
                <span className="font-bold text-slate-900 block text-sm">{orderData.customer.name}</span>
              </div>

              <div className="flex items-center space-x-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{orderData.customer.email}</span>
              </div>

              <div className="flex items-center space-x-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{orderData.customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Billing Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-[#9C3A50]" />
              <span>Teslimat & Fatura Adresi</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-800 block mb-1">Teslimat Adresi:</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {orderData.customer.address}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Fatura Adresi:</span>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {orderData.customer.billingAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
