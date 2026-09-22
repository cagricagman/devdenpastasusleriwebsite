'use client';

import React, { useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Plus,
  Minus,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStockThreshold: number;
  unit: string;
  location: string;
  status: 'OPTIMAL' | 'CRITICAL' | 'OUT_OF_STOCK';
}

const initialInventory: InventoryItem[] = [
  { id: 'inv-1', name: 'Gold Pleksi Happy Birthday Topper', sku: 'GB-TOPPER-GLD-01', category: 'Pasta Süsleri', stock: 120, minStockThreshold: 20, unit: 'Adet', location: 'Raf A-12', status: 'OPTIMAL' },
  { id: 'inv-2', name: 'Altın Metal İncili Minyatür Taç', sku: 'TAC-CROWN-GLD-01', category: 'Taçlar & Aksesuarlar', stock: 3, minStockThreshold: 10, unit: 'Adet', location: 'Raf B-04', status: 'CRITICAL' },
  { id: 'inv-3', name: 'Rose Gold "İyi Ki Doğdun" Topper', sku: 'GB-TOPPER-RG-02', category: 'Pasta Süsleri', stock: 85, minStockThreshold: 15, unit: 'Adet', location: 'Raf A-14', status: 'OPTIMAL' },
  { id: 'inv-4', name: 'Altın Işıltılı Yenebilir Toz Sprey', sku: 'GB-SPREY-GLD-02', category: 'Gıda Boyaları', stock: 0, minStockThreshold: 25, unit: 'Şişe', location: 'Raf C-01', status: 'OUT_OF_STOCK' },
  { id: 'inv-5', name: '3D Maket Kelebek Seti (12 Parça)', sku: 'DEC-BUTTERFLY-01', category: 'Pasta Üstü Dekor', stock: 45, minStockThreshold: 10, unit: 'Paket', location: 'Raf A-[#08]', status: 'OPTIMAL' },
  { id: 'inv-6', name: 'Şeffaf Akrilik Pasta Standı (3 Katlı)', sku: 'STD-ACRYLIC-03', category: 'Standlı Süsler', stock: 4, minStockThreshold: 8, unit: 'Adet', location: 'Raf D-02', status: 'CRITICAL' },
];

export default function AdminInventoryPage(): React.JSX.Element {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStockAdjust = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          const newStatus =
            newStock === 0
              ? 'OUT_OF_STOCK'
              : newStock <= item.minStockThreshold
              ? 'CRITICAL'
              : 'OPTIMAL';
          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      })
    );
    showNotification('Stok seviyesi güncellendi.');
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage) || 1;
  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#201A19] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#9C3A50]">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#9C3A50]">
            <Boxes className="w-4 h-4" />
            <span>Depo & Lojistik</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            Stok & Depo Kontrol Paneli ({inventory.length} Ürün Kalemi)
          </h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Ürün adı, SKU veya raf konumu ile ara..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">Tüm Stok Durumları</option>
            <option value="OPTIMAL">Yeterli Stok (Optimal)</option>
            <option value="CRITICAL">Kritik Stok Uyarısı</option>
            <option value="OUT_OF_STOCK">Stok Düştü (Tükendi)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ürün & SKU</th>
                <th className="py-3.5 px-4">Depo Konumu</th>
                <th className="py-3.5 px-4">Mevcut Stok</th>
                <th className="py-3.5 px-4">Kritik Eşik</th>
                <th className="py-3.5 px-4">Durum</th>
                <th className="py-3.5 px-4 text-right">Stok Düzeltme</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedInventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <span className="block font-semibold text-slate-900">{item.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{item.location}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 text-sm">
                    {item.stock} {item.unit}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{item.minStockThreshold} {item.unit}</td>
                  <td className="py-3.5 px-4">
                    {item.status === 'OPTIMAL' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3 h-3" />
                        <span>Optimal</span>
                      </span>
                    )}
                    {item.status === 'CRITICAL' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Kritik Seviye</span>
                      </span>
                    )}
                    {item.status === 'OUT_OF_STOCK' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                        <span>Tükendi</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => handleStockAdjust(item.id, -10)}
                        title="10 Adet Düş"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleStockAdjust(item.id, 10)}
                        title="10 Adet Ekle"
                        className="p-1.5 rounded-lg bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Toplam <strong className="text-slate-800">{filteredInventory.length}</strong> kalemden{' '}
            <strong className="text-slate-800">
              {filteredInventory.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredInventory.length)}
            </strong>{' '}
            arası gösteriliyor.
          </p>

          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 disabled:opacity-40 transition flex items-center space-x-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Önceki</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                  currentPage === pageNum
                    ? 'bg-[#9C3A50] text-white shadow-xs'
                    : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 disabled:opacity-40 transition flex items-center space-x-1"
            >
              <span>Sonraki</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
