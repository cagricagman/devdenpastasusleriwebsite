import React from 'react';
import { StatsCards } from '@/components/StatsCards';
import { RecentOrdersTable } from '@/components/RecentOrdersTable';
import { Sparkles, Plus, Download } from 'lucide-react';

export default function AdminDashboardPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#9C3A50]">
            <Sparkles className="w-4 h-4" />
            <span>Hoş Geldiniz, Yönetici Wakko</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            Genel Bakış & Mağaza Performansı
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition">
            <Download className="w-4 h-4" />
            <span>Rapor İndir</span>
          </button>

          <button className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs rounded-xl shadow-md transition">
            <Plus className="w-4 h-4" />
            <span>Yeni Ürün Ekle</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <StatsCards />

      {/* Recent Orders Section */}
      <RecentOrdersTable />
    </div>
  );
}
