'use client';

import React from 'react';
import { DollarSign, ShoppingBag, Package, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';

const stats = [
  {
    title: 'Toplam Satış Hacmi',
    value: '₺48.520,70',
    change: '+18.4% geçen aya göre',
    icon: DollarSign,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    title: 'Bekleyen Siparişler',
    value: '12 Sipariş',
    change: '4 yeni sipariş onay bekliyor',
    icon: ShoppingBag,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    title: 'Aktif Ürün Sayısı',
    value: '22 Çeşit',
    change: '8 Kategori altında',
    icon: Package,
    color: 'from-[#9C3A50] to-[#7A2B3C]',
    bgColor: 'bg-[#FFF0F2] text-[#9C3A50] border-[#FFD9DE]',
  },
  {
    title: 'Kritik Stok Uyarısı',
    value: '3 Ürün',
    change: 'Minimum seviyenin altında',
    icon: AlertTriangle,
    color: 'from-rose-500 to-red-600',
    bgColor: 'bg-rose-50 text-rose-600 border-rose-100',
  },
];

export const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {item.title}
              </span>
              <div className={`p-2.5 rounded-xl border ${item.bgColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </h3>
              <div className="flex items-center space-x-1 mt-1 text-xs text-slate-500">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>{item.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
