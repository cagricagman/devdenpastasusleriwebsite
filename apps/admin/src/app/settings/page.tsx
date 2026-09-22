'use client';

import React, { useState } from 'react';
import {
  Settings,
  Save,
  Store,
  Truck,
  MapPin,
  Share2,
  Layout,
  CheckCircle2,
  Instagram,
  Facebook,
  Phone,
  Sparkles,
} from 'lucide-react';

export default function AdminSettingsPage(): React.JSX.Element {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // State for all settings
  const [settings, setSettings] = useState({
    // Store Identity
    storeName: 'Wakko Pasta Süsleri',
    supportEmail: 'destek@wakkopastasusleri.com',
    supportPhone: '+90 (532) 330 07 02',

    // Physical Address
    address: 'İkitelli OSB Mahallesi, Pastacılar Sanayi Sitesi A Blok No: 42',
    district: 'Başakşehir',
    city: 'İstanbul',
    taxOffice: 'İkitelli Vergi Dairesi',
    taxNumber: '9280192841',

    // Social Media
    instagramUrl: 'https://instagram.com/wakkopastasusleri',
    facebookUrl: 'https://facebook.com/wakkopastasusleri',
    whatsappNumber: '05559255000',

    // Frontend Interface Text (Sol taraftaki sosyal medya iconlarının yanındaki duyuru yazısı)
    headerAnnouncementText: '✨ 300 TL Üzeri Siparişlerde Ücretsiz Kargo & Aynı Gün Teslimat!',

    // Shipping
    freeShippingThreshold: '300',
    flatShippingFee: '29.90',
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Mağaza ayarları, sosyal medya ve arayüz metinleri başarıyla kaydedildi!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#201A19] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#9C3A50]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#9C3A50]">
              <Settings className="w-4 h-4" />
              <span>Sistem Yapılandırması</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              Mağaza & Arayüz Ayarları
            </h1>
          </div>

          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>Ayarları Kaydet</span>
          </button>
        </div>

        {/* 1. Frontend Arayüz & Header Duyuru Yönetimi */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Layout className="w-4 h-4 text-[#9C3A50]" />
            <span>Kullanıcı Arayüzü & Sol Üst Duyuru Yönetimi</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Frontend Sol Üst Duyuru Metni (Instagram & Facebook İkonlarının Üstündeki/Yanındaki Yazı) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={settings.headerAnnouncementText}
                  onChange={(e) => setSettings({ ...settings, headerAnnouncementText: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
                <Sparkles className="w-4 h-4 text-[#9C3A50] absolute left-3 top-3" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Bu metin mağazanın sol üst duyuru çubuğunda canlı olarak görüntülenecektir.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Sosyal Medya Bilgileri */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Share2 className="w-4 h-4 text-[#9C3A50]" />
            <span>Sosyal Medya & İletişim Kanalları</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1 flex items-center space-x-1">
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram Bağlantısı</span>
              </label>
              <input
                type="text"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 flex items-center space-x-1">
                <Facebook className="w-3.5 h-3.5 text-blue-600" />
                <span>Facebook Bağlantısı</span>
              </label>
              <input
                type="text"
                value={settings.facebookUrl}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Hat Numarası</span>
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
              />
            </div>
          </div>
        </div>

        {/* 3. Mağaza Adres Bilgisi & Fatura */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-[#9C3A50]" />
            <span>Fiziki Adres & Fatura Bilgileri</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Açık Adres</label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">İlçe</label>
                <input
                  type="text"
                  value={settings.district}
                  onChange={(e) => setSettings({ ...settings, district: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Şehir</label>
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Vergi Dairesi</label>
                <input
                  type="text"
                  value={settings.taxOffice}
                  onChange={(e) => setSettings({ ...settings, taxOffice: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Vergi Numarası</label>
                <input
                  type="text"
                  value={settings.taxNumber}
                  onChange={(e) => setSettings({ ...settings, taxNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Mağaza Kimliği */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Store className="w-4 h-4 text-[#9C3A50]" />
            <span>Genel Mağaza Kimliği</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Mağaza Adı</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Destek E-Posta</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Müşteri Hizmetleri Telefon</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
              />
            </div>
          </div>
        </div>

        {/* 5. Kargo Kuralları */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Truck className="w-4 h-4 text-[#9C3A50]" />
            <span>Kargo & Limit Kuralları</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Ücretsiz Kargo Limiti (TL)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Sabit Kargo Ücreti (TL)</label>
              <input
                type="number"
                step="0.01"
                value={settings.flatShippingFee}
                onChange={(e) => setSettings({ ...settings, flatShippingFee: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
