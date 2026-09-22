'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Package,
  Upload,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Boxes,
  Tag,
  Layers,
  Image as ImageIcon,
  Check,
  ChevronRight,
  Trash2,
} from 'lucide-react';

export default function AdminNewProductPage(): React.JSX.Element {
  const router = useRouter();
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState(`WAKKO-${Math.floor(1000 + Math.random() * 9000)}`);
  const [category, setCategory] = useState('Pasta Süsleri & Topperlar');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [status, setStatus] = useState<'ACTIVE' | 'DRAFT'>('ACTIVE');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [material, setMaterial] = useState('Gold Aynalı Pleksi');

  const processFile = (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Lütfen geçerli bir görsel dosyası seçin (PNG, JPG, WEBP, GIF, SVG).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Görsel boyutu en fazla 5MB olabilir.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setImageUrl(result);
        setNotification('Görsel başarıyla seçildi ve yüklendi!');
        setTimeout(() => setNotification(null), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProd = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      sku: sku.trim(),
      category,
      price: parseFloat(price) || 0,
      discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
      stock: parseInt(stock, 10) || 0,
      status: (parseInt(stock, 10) <= 5 ? 'LOW_STOCK' : 'ACTIVE') as 'ACTIVE' | 'LOW_STOCK' | 'OUT_OF_STOCK',
      image: imageUrl || 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=400',
    };

    try {
      const existing = localStorage.getItem('wakko_admin_products');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newProd);
      localStorage.setItem('wakko_admin_products', JSON.stringify(list));
    } catch (err) {
      // ignore
    }

    setNotification(`"${name || 'Yeni Ürün'}" başarıyla oluşturuldu ve yayınlandı!`);
    setTimeout(() => {
      router.push('/products');
    }, 1200);
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

      {/* Top Header / Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <Link
            href="/products"
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#9C3A50]">
              <Package className="w-4 h-4" />
              <span>Ürün Ekleme Ekranı</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">Yeni Ürün Ekle</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => {
              setStatus('DRAFT');
              setNotification('Ürün taslak olarak kaydedildi.');
              setTimeout(() => router.push('/products'), 1200);
            }}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition"
          >
            Taslak Olarak Kaydet
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Ürünü Yayınla</span>
          </button>
        </div>
      </div>

      {/* Main Form Layout (2 Columns) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Main Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Package className="w-4 h-4 text-[#9C3A50]" />
              <span>Temel Ürün Bilgileri</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Ürün Adı *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Gold Pleksi 'Happy Birthday' Pasta Süsü"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50] font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Ürün Detaylı Açıklaması</label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ürünün boyutları, gıda ile uyumluluğu ve malzeme kalitesi hakkında detaylar yazın..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50] text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <ImageIcon className="w-4 h-4 text-[#9C3A50]" />
              <span>Ürün Görselleri</span>
            </h3>

            <div className="space-y-4 text-xs">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer select-none ${
                  isDragging
                    ? 'border-[#9C3A50] bg-[#FFF8F6] scale-[1.01]'
                    : 'border-slate-200 hover:border-[#9C3A50] bg-slate-50 hover:bg-[#FFF8F6]/60'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#9C3A50] mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-800 block text-xs">
                  Görsel Yüklemek İçin Tıklayın veya Sürükleyin
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">
                  PNG, JPG, WEBP, GIF (Maksimum 5MB)
                </span>
              </div>

              {uploadError && (
                <p className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {uploadError}
                </p>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Veya Doğrudan Görsel URL Adresi Girin</label>
                <input
                  type="text"
                  value={imageUrl}
                  placeholder="https://..."
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              {imageUrl && (
                <div className="pt-2">
                  <label className="font-bold text-slate-700 block mb-2">Seçilen / Yüklenen Görsel Önizlemesi</label>
                  <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-white relative flex-shrink-0 shadow-xs">
                      <img src={imageUrl} alt="Önizleme" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 bg-[#9C3A50] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Ana Görsel
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-xs truncate">Ürün Görseli Yüklendi</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{imageUrl.substring(0, 50)}...</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] rounded-lg transition"
                        >
                          Farklı Görsel Seç
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageUrl('')}
                          className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-lg transition font-bold text-[11px] flex items-center space-x-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Kaldır</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <DollarSign className="w-4 h-4 text-[#9C3A50]" />
              <span>Fiyatlandırma & Maliyet</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Satış Fiyatı (TL) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="49.90"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">İndirimli Fiyat (TL)</label>
                <input
                  type="number"
                  step="0.01"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder="39.90"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#9C3A50] focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Maliyet Fiyatı (TL)</label>
                <input
                  type="number"
                  step="0.01"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="15.00"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
                />
              </div>
            </div>
          </div>

          {/* Inventory & Stock */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Boxes className="w-4 h-4 text-[#9C3A50]" />
              <span>Envanter & Stok Yönetimi</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">SKU Kodu (Stok Takip Kodu)</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Stok Miktarı (Adet)</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-[#9C3A50]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Visibility */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-[#9C3A50]" />
              <span>Ürün Durumu</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Yayın Durumu</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'DRAFT')}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#9C3A50]"
                >
                  <option value="ACTIVE">Aktif (Mağazada Yayında)</option>
                  <option value="DRAFT">Taslak (Yayında Değil)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category & Organization */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Layers className="w-4 h-4 text-[#9C3A50]" />
              <span>Kategori & Özellikler</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Ana Kategori *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#9C3A50]"
                >
                  <option value="Pasta Süsleri & Topperlar">Pasta Süsleri & Topperlar</option>
                  <option value="Standlı Pasta Süsleri">Standlı Pasta Süsleri</option>
                  <option value="Pasta Üstü Dekorasyon">Pasta Üstü Dekorasyon</option>
                  <option value="Pasta Mumları">Pasta Mumları</option>
                  <option value="Taçlar & Aksesuarlar">Taçlar & Aksesuarlar</option>
                  <option value="Şekerlemeler & İnciler">Şekerlemeler & İnciler</option>
                  <option value="Pastacılık Ekipmanları">Pastacılık Ekipmanları</option>
                  <option value="Renkli Gıda Boyaları">Renkli Gıda Boyaları</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Malzeme Türü</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#9C3A50]"
                >
                  <option value="Gold Aynalı Pleksi">Gold Aynalı Pleksi</option>
                  <option value="Rose Gold Pleksi">Rose Gold Pleksi</option>
                  <option value="Gümüş Aynalı Pleksi">Gümüş Aynalı Pleksi</option>
                  <option value="Ahşap & Doğal">Ahşap & Doğal</option>
                  <option value="Yenebilir Şeker & Sim">Yenebilir Şeker & Sim</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
